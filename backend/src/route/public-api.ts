import express from "express";
import userController from "../controller/user-controller";

const publicRouter = express.Router();
publicRouter.post("/api/auth/register", userController.register);

export { publicRouter };
