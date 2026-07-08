import { prismaClient } from "../src/application/database";

import bcrypt from "bcrypt";

export const UserTest = {
  delete: async () => {
    await prismaClient.user.deleteMany({
      where: {
        email: "test@gmail.com",
      },
    });
  },
  create: async () => {
    await prismaClient.user.create({
      data: {
        email: "test@gmail.com",
        name: "Test User",
        password: await bcrypt.hash("password123", 10),
      },
    });
  },
  createWithToken: async () => {
    await prismaClient.user.create({
      data: {
        email: "test@gmail.com",
        name: "Test User",
        password: await bcrypt.hash("password123", 10),
        token: "test-token-12345",
      },
    });
  },
};
