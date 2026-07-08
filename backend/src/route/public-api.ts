import express from "express";
import userController from "../controller/user-controller";
import templateController from "../controller/template-controller";

const publicRouter = express.Router();
publicRouter.post("/api/auth/register", userController.register);
publicRouter.post("/api/auth/login", userController.login);
publicRouter.get("/api/templates", templateController.get);

export { publicRouter };
