import express from "express";
import { publicRouter } from "../route/public-api";
import { userRouter } from "../route/api";
import { errorMiddleware } from "../middleware/error-middleware";

export const web = express();
web.use(express.json());
web.use("/avatars", express.static("public/avatars"));
web.use("/photos", express.static("public/photos"));

web.use(publicRouter);
web.use(userRouter);

web.use(errorMiddleware);
