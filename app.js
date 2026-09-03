const express = require("express");
const os = require("os");

const app = express();
app.use(express.json());

const APP_NAME = process.env.APP_NAME || "MyApp";
const ENV = process.env.ENV || "development";

app.get("/", (req, res) => {
  return res.json({
    app: APP_NAME,
    environment: ENV,
    pod: os.hostname(),
    time: new Date().toISOString(),
  });
});

app.get("/health", (req, res) => res.json({ status: "healthy" }));
app.get("/ready", (req, res) => res.json({ status: "ready" }));
app.get("/version", (req, res) => res.json({ version: "v6" }));

app.get("/heavy", (req, res) => {
  let sum = 0;
  for (let i = 0; i < 50000000; i++) sum += i;
  res.json({ result: sum });
});

module.exports = app;
