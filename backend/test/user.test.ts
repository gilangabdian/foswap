import { describe, it, expect, afterEach, beforeEach } from "vitest";
import supertest from "supertest";
import { web } from "../src/application/web";
import { logger } from "../src/application/logging";
import { UserTest } from "./test-util";

describe("POST /api/auth/register", () => {
  afterEach(async () => {
    await UserTest.delete();
  });

  it("should register a new user successfully", async () => {
    const response = await supertest(web).post("/api/auth/register").send({
      name: "Test",
      email: "test@gmail.com",
      password: "password123",
    });

    expect(response.status).toBe(201);
    expect(response.body.data.name).toBe("Test");
  });

  it("should reject if invalid", async () => {
    const response = await supertest(web).post("/api/auth/register").send({
      name: "",
      email: "",
      password: "",
    });

    logger.info(response.body);

    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined;
  });
});

describe("DELETE /api/auth/logout", () => {
  beforeEach(async () => {
    await UserTest.createWithToken();
  });

  afterEach(async () => {
    await UserTest.delete();
  });

  it("should logout successfully if token is valid", async () => {
    const response = await supertest(web)
      .delete("/api/auth/logout")
      .set("Authorization", "Bearer test-token-12345");

    expect(response.status).toBe(200);
    expect(response.body.data).toBe("OK");
  });

  it("should reject if token is invalid", async () => {
    const response = await supertest(web)
      .delete("/api/auth/logout")
      .set("Authorization", "Bearer salah-token");

    expect(response.status).toBe(401);
    expect(response.body.errors).toBeDefined();
  });

  it("should reject if no token is provided", async () => {
    const response = await supertest(web).delete("/api/auth/logout");

    expect(response.status).toBe(401);
    expect(response.body.errors).toBeDefined();
  });
});
