import { prismaClient } from "../src/application/database";

export const UserTest = {
  delete: async () => {
    await prismaClient.user.deleteMany({
      where: {
        email: "test@gmail.com",
      },
    });
  },
  createWithToken: async () => {
    await prismaClient.user.create({
      data: {
        email: "test@gmail.com",
        name: "Test User",
        password: "hashedpassword123",
        token: "test-token-12345",
      },
    });
  },
};
