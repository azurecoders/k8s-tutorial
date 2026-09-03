const request = require("supertest");
const app = require("./app");

describe("API Tests", () => {
  it("GET / should return app info", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("app");
    expect(res.body).toHaveProperty("environment");
    expect(res.body).toHaveProperty("pod");
  });

  it("GET /health should return 200", async () => {
    const res = await request(app).get("/health");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ status: "healthy" });
  });

  it("GET /ready should return 200", async () => {
    const res = await request(app).get("/ready");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ status: "ready" });
  });
});
