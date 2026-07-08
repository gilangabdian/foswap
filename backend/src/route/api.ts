import express from "express";
import { authMiddleware } from "../middleware/auth-middleware";
import userController from "../controller/user-controller";
import { uploadMiddleware } from "../middleware/upload-middleware";

const userRouter = express.Router();
userRouter.use(authMiddleware);

// User API
userRouter.get("/api/users/profile", userController.get);
userRouter.put("/api/users/profile", userController.put);
userRouter.patch("/api/users/profile", userController.update);
userRouter.patch("/api/users/avatar", uploadMiddleware.single("avatar"), userController.updateAvatar);
userRouter.delete("/api/auth/logout", userController.logout);

//

export { userRouter };
