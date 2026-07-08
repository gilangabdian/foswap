import { Project, Photo, Template } from "../../generated/prisma/client";
import { TemplateResponse } from "./template-model";

export type PhotoResponse = {
  id: string;
  imageUrl: string;
  sequence: number;
  projectId: string;
  createdAt: string;
};

export type ProjectResponse = {
  id: string;
  title: string | null;
  status: string;
  transitionDuration: number;
  backgroundType: string;
  backgroundColor: string | null;
  resultVideoUrl: string | null;
  userId: string;
  templateId: number | null;
  createdAt: string;
  updatedAt: string;
  photos?: PhotoResponse[];
  template?: TemplateResponse | null;
};

export type CreateProjectRequest = {
  title?: string;
};

export type UpdateProjectSettingsRequest = {
  id: string;
  title?: string;
  templateId?: number;
  transitionDuration?: number;
  backgroundType?: "SOLID_COLOR" | "BLUR_IMAGE";
  backgroundColor?: string;
};

export type GenerateVideoResponse = {
  message: string;
  status: string;
};

export type ProjectStatusResponse = {
  status: string;
  resultVideoUrl: string | null;
};

export type ProjectDownloadResponse = {
  url: string;
};

export function toPhotoResponse(photo: Photo): PhotoResponse {
  return {
    id: photo.id,
    imageUrl: photo.imageUrl,
    sequence: photo.sequence,
    projectId: photo.projectId,
    createdAt: photo.createdAt.toISOString(),
  };
}

export function toProjectResponse(
  project: Project & { photos?: Photo[]; template?: Template | null }
): ProjectResponse {
  const response: ProjectResponse = {
    id: project.id,
    title: project.title,
    status: project.status,
    transitionDuration: project.transitionDuration,
    backgroundType: project.backgroundType,
    backgroundColor: project.backgroundColor,
    resultVideoUrl: project.resultVideoUrl,
    userId: project.userId,
    templateId: project.templateId,
    createdAt: project.createdAt.toISOString(),
    updatedAt: project.updatedAt.toISOString(),
  };

  if (project.photos) {
    response.photos = project.photos.map(toPhotoResponse);
  }

  if (project.template) {
    response.template = {
      id: project.template.id,
      name: project.template.name,
      description: project.template.description,
      animationCode: project.template.animationCode,
    };
  } else if (project.template === null) {
    response.template = null;
  }

  return response;
}
