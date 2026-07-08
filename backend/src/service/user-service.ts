import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import type { LoginUserRequest, RegisterUserRequest, UpdateUserRequest, UserResponse } from "../model/user-model";
import {
  loginUserValidation,
  registerUserValidation,
  updateUserValidation,
  putUserValidation,
} from "../validation/user-validation";
import { validate } from "../validation/validation";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

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

const login = async (request: unknown): Promise<UserResponse> => {
  const loginRequest = validate<LoginUserRequest>(loginUserValidation, request);

  const user = await prismaClient.user.findUnique({
    where: {
      email: loginRequest.email,
    },
  });

  if (!user) {
    throw new ResponseError(401, "Email or password is not valid");
  }

  const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password);

  if (!isPasswordValid) {
    throw new ResponseError(401, "Email or password is not valid");
  }

  const token = uuidv4().toString();

  return await prismaClient.user.update({
    where: { email: loginRequest.email },
    data: { token: token },
    select: {
      id: true,
      name: true,
      email: true,
      token: true,
    },
  });
};

const get = async (email: string): Promise<UserResponse> => {
  const user = await prismaClient.user.findUnique({
    where: { email: email },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });

  if (!user) {
    throw new ResponseError(404, "User not found");
  }

  return user;
};

const update = async (request: unknown): Promise<UserResponse> => {
  const user = validate<UpdateUserRequest>(updateUserValidation, request);

  const totalUserInDatabase = await prismaClient.user.count({
    where: {
      email: user.email,
    },
  });

  if (totalUserInDatabase !== 1) {
    throw new ResponseError(404, "User not found");
  }
  const data: any = {};
  if (user.name) {
    data.name = user.name;
  }
  if (user.password) {
    data.password = await bcrypt.hash(user.password, 10);
  }
  if (user.bio !== undefined) {
    data.bio = user.bio;
  }
  if (user.avatar !== undefined) {
    data.avatar = user.avatar;
  }

  return await prismaClient.user.update({
    where: {
      email: user.email,
    },
    data: data,
    select: {
      email: true,
      name: true,
      id: true,
    },
  });
};

const put = async (request: unknown): Promise<UserResponse> => {
  const user = validate<UpdateUserRequest>(putUserValidation, request);

  const totalUserInDatabase = await prismaClient.user.count({
    where: {
      email: user.email,
    },
  });

  if (totalUserInDatabase !== 1) {
    throw new ResponseError(404, "User not found");
  }

  const data: any = {
    name: user.name,
    bio: user.bio !== undefined ? user.bio : null, // as per openapi, PUT is full update. If bio isn't sent or sent as null/empty, we might want to clear it. But since joi allows missing it, let's just use what's provided or clear it if not provided. Actually, putUserValidation has bio as optional, so if not provided it's undefined. Let's set it to null if undefined to match PUT behavior.
  };

  if (user.bio === undefined) {
    data.bio = null;
  }

  return await prismaClient.user.update({
    where: {
      email: user.email,
    },
    data: data,
    select: {
      email: true,
      name: true,
      id: true,
    },
  });
};

const logout = async (email: string): Promise<UserResponse> => {
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

export default { register, login, get, update, put, logout };
