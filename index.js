const express = require("express");
const jest = require("jest");
const request = require("supertest");
const app = express();

const PORT = process.env.PORT || 3000;
const APP_NAME = process.env.APP_NAME || "MyApp";
const ENV = process.env.ENV || "development";

app.get("/", (req, res) => {
  return res.json({
    app: APP_NAME,
    environment: ENV,
    pod: require("os").hostname(),
    time: new Date().toISOString(),
  });
});

app.get("/health", (req, res) => res.json({ status: "healthy" }));
app.get("/ready", (req, res) => res.json({ status: "ready" }));

app.get("/heavy", (req, res) => {
  // Simulate CPU-heavy work (we'll use this later for autoscaling)
  let sum = 0;
  for (let i = 0; i < 50000000; i++) sum += i;
  res.json({ result: sum });
});

describe("API Tests", () => {
  it("GET / should return app info", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("ok");
  });

  it("GET /health should return 200", async () => {
    const res = await request(app).get("/health");
    expect(res.statusCode).toBe(200);
  });

  it("GET /ready should return 200", async () => {
    const res = await request(app).get("/ready");
    expect(res.statusCode).toBe(200);
  });
});

app.listen(PORT, () => {
  console.log(`${APP_NAME} is running on :${PORT} [${ENV}]`);
});
