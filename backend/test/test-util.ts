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

export const TemplateTest = {
  delete: async () => {
    await prismaClient.template.deleteMany({
      where: {
        name: "Test Template",
      },
    });
  },
  create: async () => {
    await prismaClient.template.create({
      data: {
        name: "Test Template",
        description: "Test Description",
        animationCode: "test_animation",
      },
    });
  },
};

export const ProjectTest = {
  delete: async () => {
    // Relying on CASCADE to delete photos, but we can do it explicitly if needed
    const user = await prismaClient.user.findFirst({
      where: { email: "test@gmail.com" },
    });
    if (user) {
      await prismaClient.project.deleteMany({
        where: { userId: user.id },
      });
    }
  },
  create: async () => {
    const user = await prismaClient.user.findFirst({
      where: { email: "test@gmail.com" },
    });
    if (user) {
      const project = await prismaClient.project.create({
        data: {
          userId: user.id,
          title: "Test Project",
          transitionDuration: 1,
          backgroundType: "SOLID_COLOR",
          backgroundColor: "#000000",
        },
      });
      return project;
    }
    return null;
  },
};

export const PhotoTest = {
  create: async (projectId: string, count: number = 2) => {
    const data = [];
    for (let i = 1; i <= count; i++) {
      data.push({
        projectId: projectId,
        imageUrl: `http://localhost/photos/dummy${i}.jpg`,
        sequence: i,
      });
    }
    await prismaClient.photo.createMany({
      data: data,
    });
  },
};
