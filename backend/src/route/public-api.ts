import express from "express";
import userController from "../controller/user-controller";

const publicRouter = express.Router();
publicRouter.post("/api/auth/register", userController.register);
publicRouter.post("/api/auth/login", userController.login);

export { publicRouter };
