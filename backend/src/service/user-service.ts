import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import type { RegisterUserRequest, UserResponse } from "../model/user-model";
import { getUserValidation, registerUserValidation } from "../validation/user-validation";
import { validate } from "../validation/validation";
import bcrypt from "bcrypt";

const register = async (request: unknown): Promise<UserResponse> => {
  const user = validate<RegisterUserRequest>(registerUserValidation, request);

  const countUser = await prismaClient.user.count({
    where: {
      email: user.email,
    },
  });

  if (countUser === 1) {
    throw new ResponseError(400, "User already exists");
  }

  user.password = await bcrypt.hash(user.password, 10);

  return prismaClient.user.create({
    data: user,
    select: {
      id: true,
      name: true,
      email: true,
    },
  });
};

const logout = async (email: string) => {
  const user = await prismaClient.user.findUnique({
    where: { email: email },
  });

  if (!user) {
    throw new ResponseError(404, "User not found");
  }

  return prismaClient.user.update({
    where: { email: email },
    data: { token: null },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });
};

export default { register, logout };
