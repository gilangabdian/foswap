import type { Request, Response, NextFunction } from "express";
import userService from "../service/user-service";

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await userService.register(req.body);
    res.status(201).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await userService.login(req.body);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};
const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const email = req.user!.email;
    const result = await userService.get(email);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const email = req.user?.email;
    const request = req.body;
    request.email = email;
    const result = await userService.update(request);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const put = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const email = req.user?.email;
    const request = req.body;
    request.email = email;
    const result = await userService.put(request);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const updateAvatar = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const email = req.user?.email;
    if (!req.file) {
      res.status(400).json({
        errors: "Avatar file is required"
      });
      return;
    }
    
    // Construct the public URL for the avatar
    const avatarUrl = `${req.protocol}://${req.get("host")}/avatars/${req.file.filename}`;
    
    // We can reuse userService.update for avatar
    const request = { email: email, avatar: avatarUrl };
    const result = await userService.update(request);
    
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await userService.logout(req.user!.email);
    res.status(200).json({
      data: "OK",
    });
  } catch (e) {
    next(e);
  }
};

export default {
  register,
  login,
  get,
  update,
  put,
  updateAvatar,
  logout,
};
