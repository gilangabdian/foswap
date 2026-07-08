import express from "express";
import { authMiddleware } from "../middleware/auth-middleware";
import userController from "../controller/user-controller";
import { uploadMiddleware, uploadPhotosMiddleware } from "../middleware/upload-middleware";
import projectController from "../controller/project-controller";

const userRouter = express.Router();
userRouter.use(authMiddleware);

// User Profile
userRouter.get("/api/users/profile", userController.get);
userRouter.put("/api/users/profile", userController.put);
userRouter.patch("/api/users/profile", userController.update);
userRouter.patch("/api/users/avatar", uploadMiddleware.single("avatar"), userController.updateAvatar);
userRouter.delete("/api/auth/logout", userController.logout);

// Projects
userRouter.post("/api/projects", projectController.create);
userRouter.get("/api/projects", projectController.getAll);
userRouter.get("/api/projects/:id", projectController.get);
userRouter.put("/api/projects/:id/settings", projectController.updateSettings);

// Project Photos
userRouter.post("/api/projects/:id/photos", uploadPhotosMiddleware.array("photos", 16), projectController.uploadPhotos);
userRouter.delete("/api/projects/:id/photos/:photoId", projectController.deletePhoto);

export { userRouter };
