import { Request, Response, NextFunction } from "express";
import projectService from "../service/project-service";
import { CreateProjectRequest, UpdateProjectSettingsRequest } from "../model/project-model";

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.id;
    const request = req.body as CreateProjectRequest;
    
    const result = await projectService.create(userId, request);
    res.status(201).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.id;
    
    const result = await projectService.getAll(userId);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.id;
    const projectId = req.params.id;
    
    const result = await projectService.get(userId, projectId);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const updateSettings = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.id;
    const request = req.body as UpdateProjectSettingsRequest;
    request.id = req.params.id;
    
    const result = await projectService.updateSettings(userId, request);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const uploadPhotos = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.id;
    const projectId = req.params.id;
    
    // Multer places the array of files in req.files
    const files = req.files as Express.Multer.File[];
    
    if (!files || files.length === 0) {
      res.status(400).json({
        errors: {
          message: "No photos uploaded",
        },
      });
      return;
    }

    const result = await projectService.uploadPhotos(userId, projectId, files);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const deletePhoto = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.id;
    const projectId = req.params.id;
    const photoId = req.params.photoId;
    
    const result = await projectService.deletePhoto(userId, projectId, photoId);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const generateVideo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.id;
    const projectId = req.params.id;
    
    const result = await projectService.generateVideo(userId, projectId);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const getStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.id;
    const projectId = req.params.id;
    
    const result = await projectService.getStatus(userId, projectId);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const getDownload = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.id;
    const projectId = req.params.id;
    
    const result = await projectService.getDownload(userId, projectId);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
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
