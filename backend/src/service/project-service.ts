import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { CreateProjectRequest, ProjectResponse, UpdateProjectSettingsRequest, toProjectResponse, toPhotoResponse, PhotoResponse } from "../model/project-model";
import { createProjectValidation, updateProjectSettingsValidation } from "../validation/project-validation";
import { validate } from "../validation/validation";
import fs from "fs";

const create = async (userId: string, request: CreateProjectRequest): Promise<ProjectResponse> => {
  const projectRequest = validate(createProjectValidation, request);

  const project = await prismaClient.project.create({
    data: {
      userId: userId,
      title: projectRequest.title,
    },
  });

  return toProjectResponse(project);
};

const getAll = async (userId: string): Promise<ProjectResponse[]> => {
  const projects = await prismaClient.project.findMany({
    where: {
      userId: userId,
    },
    include: {
      photos: true,
      template: true,
    },
  });

  return projects.map(toProjectResponse);
};

const get = async (userId: string, projectId: string): Promise<ProjectResponse> => {
  const project = await prismaClient.project.findFirst({
    where: {
      id: projectId,
      userId: userId,
    },
    include: {
      photos: true,
      template: true,
    },
  });

  if (!project) {
    throw new ResponseError(404, "Project is not found");
  }

  return toProjectResponse(project);
};

const updateSettings = async (userId: string, request: UpdateProjectSettingsRequest): Promise<ProjectResponse> => {
  const updateRequest = validate(updateProjectSettingsValidation, request);

  const totalProjectInDatabase = await prismaClient.project.count({
    where: {
      id: updateRequest.id,
      userId: userId,
    },
  });

  if (totalProjectInDatabase !== 1) {
    throw new ResponseError(404, "Project is not found");
  }

  const project = await prismaClient.project.update({
    where: {
      id: updateRequest.id,
    },
    data: {
      title: updateRequest.title,
      templateId: updateRequest.templateId,
      transitionDuration: updateRequest.transitionDuration,
      backgroundType: updateRequest.backgroundType,
      backgroundColor: updateRequest.backgroundColor,
    },
    include: {
      photos: true,
      template: true,
    },
  });

  return toProjectResponse(project);
};

const uploadPhotos = async (userId: string, projectId: string, files: Express.Multer.File[]): Promise<PhotoResponse[]> => {
  const project = await prismaClient.project.findFirst({
    where: {
      id: projectId,
      userId: userId,
    },
    include: {
      photos: true,
    },
  });

  if (!project) {
    throw new ResponseError(404, "Project is not found");
  }

  const currentPhotosCount = project.photos.length;
  if (currentPhotosCount + files.length > 16) {
    throw new ResponseError(400, `Cannot exceed 16 photos. You can only add ${16 - currentPhotosCount} more.`);
  }

  const photosData = files.map((file, index) => {
    return {
      projectId: projectId,
      imageUrl: `http://127.0.0.1:53412/photos/${file.filename}`, // Assuming fixed port for local dev/test as per requirements or configurable
      sequence: currentPhotosCount + index + 1,
    };
  });

  await prismaClient.photo.createMany({
    data: photosData,
  });

  const savedPhotos = await prismaClient.photo.findMany({
    where: {
      projectId: projectId,
    },
    orderBy: {
      sequence: "asc",
    }
  });

  return savedPhotos.map(toPhotoResponse);
};

const deletePhoto = async (userId: string, projectId: string, photoId: string): Promise<string> => {
  const project = await prismaClient.project.findFirst({
    where: {
      id: projectId,
      userId: userId,
    },
  });

  if (!project) {
    throw new ResponseError(404, "Project is not found");
  }

  const photo = await prismaClient.photo.findFirst({
    where: {
      id: photoId,
      projectId: projectId,
    },
  });

  if (!photo) {
    throw new ResponseError(404, "Photo is not found");
  }

  // Delete the physical file
  const filename = photo.imageUrl.split("/").pop();
  if (filename) {
    const filePath = `public/photos/${filename}`;
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }

  await prismaClient.photo.delete({
    where: {
      id: photoId,
    },
  });

  // Reorder sequence
  const remainingPhotos = await prismaClient.photo.findMany({
    where: {
      projectId: projectId,
    },
    orderBy: {
      sequence: "asc",
    },
  });

  for (let i = 0; i < remainingPhotos.length; i++) {
    if (remainingPhotos[i]!.sequence !== i + 1) {
      await prismaClient.photo.update({
        where: { id: remainingPhotos[i]!.id },
        data: { sequence: i + 1 },
      });
    }
  }

  return "OK";
};

const generateVideo = async (userId: string, projectId: string) => {
  const project = await prismaClient.project.findFirst({
    where: {
      id: projectId,
      userId: userId,
    },
    include: {
      photos: true,
    },
  });

  if (!project) {
    throw new ResponseError(404, "Project is not found");
  }

  if (!project.templateId) {
    throw new ResponseError(400, "Template is not set for this project");
  }

  if (project.photos.length < 5) {
    throw new ResponseError(400, "Project must have at least 5 photos to generate a video");
  }

  await prismaClient.project.update({
    where: {
      id: projectId,
    },
    data: {
      status: "PROCESSING",
    },
  });

  // Background Job Simulation
  setTimeout(async () => {
    try {
      await prismaClient.project.update({
        where: { id: projectId },
        data: {
          status: "DONE",
          resultVideoUrl: "http://127.0.0.1:53412/dummy-video.mp4",
        },
      });
    } catch (error) {
      console.error("Failed to update project status in background job", error);
    }
  }, 1000); // Wait 1 second instead of 5 for faster tests

  return {
    message: "Video generation started",
    status: "PROCESSING",
  };
};

const getStatus = async (userId: string, projectId: string) => {
  const project = await prismaClient.project.findFirst({
    where: {
      id: projectId,
      userId: userId,
    },
  });

  if (!project) {
    throw new ResponseError(404, "Project is not found");
  }

  return {
    status: project.status,
    resultVideoUrl: project.resultVideoUrl,
  };
};

const getDownload = async (userId: string, projectId: string) => {
  const project = await prismaClient.project.findFirst({
    where: {
      id: projectId,
      userId: userId,
    },
  });

  if (!project) {
    throw new ResponseError(404, "Project is not found");
  }

  if (project.status !== "DONE" || !project.resultVideoUrl) {
    throw new ResponseError(400, "Video is not ready for download");
  }

  return {
    url: project.resultVideoUrl,
  };
};

export default {
  create,
  getAll,
  get,
  updateSettings,
  uploadPhotos,
  deletePhoto,
  generateVideo,
  getStatus,
  getDownload,
};
