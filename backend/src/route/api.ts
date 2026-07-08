import express from "express";
import userController from "../controller/user-controller";
import { authMiddleware } from "../middleware/auth-middleware";

const userRouter = express.Router();
userRouter.use(authMiddleware);

userRouter.delete("/api/auth/logout", userController.logout);
export { userRouter };
