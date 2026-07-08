import { describe, it, expect, afterEach, beforeEach } from "vitest";
import supertest from "supertest";
import { web } from "../src/application/web";
import { TemplateTest } from "./test-util";

describe("GET /api/templates", () => {
  afterEach(async () => {
    await TemplateTest.delete();
  });

  it("should get empty templates successfully if no data", async () => {
    const response = await supertest(web).get("/api/templates");

    expect(response.status).toBe(200);
    expect(response.body.data).toBeDefined();
    expect(response.body.data.length).toBe(0);
  });

  it("should get templates successfully", async () => {
    await TemplateTest.create();

    const response = await supertest(web).get("/api/templates");

    expect(response.status).toBe(200);
    expect(response.body.data).toBeDefined();
    expect(response.body.data.length).toBe(1);
    expect(response.body.data[0].id).toBeDefined();
    expect(response.body.data[0].name).toBe("Test Template");
    expect(response.body.data[0].description).toBe("Test Description");
    expect(response.body.data[0].animationCode).toBe("test_animation");
  });
});
