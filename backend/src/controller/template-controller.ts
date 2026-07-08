import { Request, Response, NextFunction } from "express";
import templateService from "../service/template-service";

const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await templateService.getAll();
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

export default {
  get,
};
