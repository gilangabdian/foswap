import type { Request, Response, NextFunction } from "express";
import { prismaClient } from "../application/database";
import type { User } from "../../generated/prisma/client";

declare global {
  namespace Express {
    export interface Request {
      user?: User;
    }
  }
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.get("Authorization");

  if (!token) {
    res.status(401).json({
      errors: "Unauthorized",
    }).end();
    return;
  }

  // Token typically comes as "Bearer <token>". We strip the "Bearer " part.
  const actualToken = token.startsWith("Bearer ") ? token.substring(7) : token;

  const user = await prismaClient.user.findFirst({
    where: {
      token: actualToken,
    },
  });

  if (!user) {
    res.status(401).json({
      errors: "Unauthorized",
    }).end();
    return;
  }

  req.user = user;
  next();
};
