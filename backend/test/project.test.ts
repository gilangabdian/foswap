import { describe, it, expect, afterEach, beforeEach } from "vitest";
import supertest from "supertest";
import { web } from "../src/application/web";
import { UserTest, ProjectTest, PhotoTest, TemplateTest } from "./test-util";
import { prismaClient } from "../src/application/database";
import path from "path";
import fs from "fs";

describe("Projects API", () => {
  beforeEach(async () => {
    await UserTest.createWithToken();
    await TemplateTest.create();
  });

  afterEach(async () => {
    await ProjectTest.delete();
    await TemplateTest.delete();
    await UserTest.delete();
  });

  describe("POST /api/projects", () => {
    it("should create project successfully", async () => {
      const response = await supertest(web)
        .post("/api/projects")
        .set("Authorization", "Bearer test-token-12345")
        .send({
          title: "My Vacation Video",
        });

      expect(response.status).toBe(201);
      expect(response.body.data.id).toBeDefined();
      expect(response.body.data.title).toBe("My Vacation Video");
      expect(response.body.data.status).toBe("DRAFT");
    });
  });

  describe("GET /api/projects", () => {
    it("should get empty array if no projects", async () => {
      const response = await supertest(web)
        .get("/api/projects")
        .set("Authorization", "Bearer test-token-12345");

      expect(response.status).toBe(200);
      expect(response.body.data.length).toBe(0);
    });

    it("should return projects for the user", async () => {
      await ProjectTest.create();
      
      const response = await supertest(web)
        .get("/api/projects")
        .set("Authorization", "Bearer test-token-12345");

      expect(response.status).toBe(200);
      expect(response.body.data.length).toBe(1);
      expect(response.body.data[0].title).toBe("Test Project");
    });
  });

  describe("GET /api/projects/:id", () => {
    it("should return 404 if project not found", async () => {
      const response = await supertest(web)
        .get("/api/projects/unknown-uuid-1234")
        .set("Authorization", "Bearer test-token-12345");

      expect(response.status).toBe(404);
      expect(response.body.errors).toBeDefined();
    });

    it("should return project details", async () => {
      const project = await ProjectTest.create();
      if (!project) throw new Error("Project creation failed in test");

      const response = await supertest(web)
        .get(`/api/projects/${project.id}`)
        .set("Authorization", "Bearer test-token-12345");

      expect(response.status).toBe(200);
      expect(response.body.data.id).toBe(project.id);
      expect(response.body.data.title).toBe("Test Project");
    });
  });

  describe("PUT /api/projects/:id/settings", () => {
    it("should update project settings successfully", async () => {
      const project = await ProjectTest.create();
      const template = await prismaClient.template.findFirst();

      const response = await supertest(web)
        .put(`/api/projects/${project!.id}/settings`)
        .set("Authorization", "Bearer test-token-12345")
        .send({
          title: "Updated Title",
          transitionDuration: 2,
          backgroundType: "BLUR_IMAGE",
          templateId: template!.id,
        });

      expect(response.status).toBe(200);
      expect(response.body.data.title).toBe("Updated Title");
      expect(response.body.data.transitionDuration).toBe(2);
      expect(response.body.data.backgroundType).toBe("BLUR_IMAGE");
      expect(response.body.data.template.id).toBe(template!.id);
    });

    it("should reject invalid color hex", async () => {
      const project = await ProjectTest.create();

      const response = await supertest(web)
        .put(`/api/projects/${project!.id}/settings`)
        .set("Authorization", "Bearer test-token-12345")
        .send({
          backgroundColor: "invalid-color",
        });

      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    });
  });

  describe("POST /api/projects/:id/photos", () => {
    it("should upload photos successfully", async () => {
      const project = await ProjectTest.create();
      
      const dummyFilePath1 = path.join(__dirname, "dummy1.jpg");
      const dummyFilePath2 = path.join(__dirname, "dummy2.jpg");
      fs.writeFileSync(dummyFilePath1, "dummy content 1");
      fs.writeFileSync(dummyFilePath2, "dummy content 2");

      const response = await supertest(web)
        .post(`/api/projects/${project!.id}/photos`)
        .set("Authorization", "Bearer test-token-12345")
        .attach("photos", dummyFilePath1)
        .attach("photos", dummyFilePath2);

      fs.unlinkSync(dummyFilePath1);
      fs.unlinkSync(dummyFilePath2);

      expect(response.status).toBe(200);
      expect(response.body.data.length).toBe(2);
      expect(response.body.data[0].sequence).toBe(1);
      expect(response.body.data[1].sequence).toBe(2);
    });

    it("should reject if exceeding 16 photos", async () => {
      const project = await ProjectTest.create();
      // Assume 15 photos already exist
      await PhotoTest.create(project!.id, 15);

      const dummyFilePath1 = path.join(__dirname, "dummy1.jpg");
      const dummyFilePath2 = path.join(__dirname, "dummy2.jpg");
      fs.writeFileSync(dummyFilePath1, "dummy");
      fs.writeFileSync(dummyFilePath2, "dummy");

      // Adding 2 more, total will be 17 -> should fail
      const response = await supertest(web)
        .post(`/api/projects/${project!.id}/photos`)
        .set("Authorization", "Bearer test-token-12345")
        .attach("photos", dummyFilePath1)
        .attach("photos", dummyFilePath2);

      fs.unlinkSync(dummyFilePath1);
      fs.unlinkSync(dummyFilePath2);

      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    });
  });

  describe("DELETE /api/projects/:id/photos/:photoId", () => {
    it("should delete photo and reorder sequences", async () => {
      const project = await ProjectTest.create();
      await PhotoTest.create(project!.id, 3);

      const photos = await prismaClient.photo.findMany({
        where: { projectId: project!.id },
        orderBy: { sequence: "asc" }
      });

      // Delete the middle photo (sequence 2)
      const photoToDelete = photos[1];

      const response = await supertest(web)
        .delete(`/api/projects/${project!.id}/photos/${photoToDelete.id}`)
        .set("Authorization", "Bearer test-token-12345");

      expect(response.status).toBe(200);

      // Check remaining photos
      const remaining = await prismaClient.photo.findMany({
        where: { projectId: project!.id },
        orderBy: { sequence: "asc" }
      });

      expect(remaining.length).toBe(2);
      expect(remaining[0]!.sequence).toBe(1);
      expect(remaining[0]!.id).toBe(photos[0]!.id);
      expect(remaining[1]!.sequence).toBe(2);
      expect(remaining[1]!.id).toBe(photos[2]!.id); // Previously sequence 3, now 2
    });
  });
});
