import express from "express";
import chalk from "chalk";
import path from "path";
import dotenv from "dotenv";
import http from "http";

import api from "./api/index.js";
import cors from "cors";

import { connectToDb, migrateToLatest } from "./db/index.js";

import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger.cjs";

import { startMonitorJob, setWebSocketClients } from "./jobs/monitor.js";
import { WebSocketServer } from "ws";

dotenv.config();

const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || "development";

const app = express();
const server = http.createServer(app);

// WebSocket server
const wss = new WebSocketServer({ server });
const clients = new Set();

wss.on("connection", (ws) => {
  clients.add(ws);
  ws.isAlive = true;

  console.log("📡 Client connected via WebSocket");

  ws.on("pong", () => {
    ws.isAlive = true;
  });

  ws.on("close", () => {
    clients.delete(ws);
    console.log("❌ Client disconnected");
  });
});

// Ping clients every 30 seconds to detect dead connections
const interval = setInterval(() => {
  wss.clients.forEach((ws) => {
    if (!ws.isAlive) return ws.terminate();
    ws.isAlive = false;
    ws.ping();
  });
}, 30000);

app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use(express.static(path.join(process.cwd(), "dist")));

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api", api);

if (env !== "development") {
  app.get("*", (req, res) => {
    res.status(200).sendFile(path.join(process.cwd(), "dist", "index.html"));
  });
}

app.use(function (request, response) {
  response.status(404);
  response.json({ message: "Resource not found, wrong path" });
});

app.use((err, request, response, next) => {
  console.error(err.message);
  console.error(err.stack);
  if (response.headersSent) {
    return next(err);
  }
  response.status(500);
  response.json({
    message: err.message,
  });
});

console.log(`🕹️\tEnvironment [[ ${chalk.bold.cyan(env)} ]]`);

connectToDb()
  .then(() => {
    if (env === "production") {
      return migrateToLatest();
    }
  })
  .then(() => {
    server.listen(port, () => {
      console.log(
        `👂\tApp listening on port ${chalk.bold.yellow(port)}`
      );

      setWebSocketClients(clients);
      startMonitorJob();
    });
  });

process.on("SIGINT", () => {
  console.log("Shutting down server...");
  clearInterval(interval);
  server.close(() => process.exit(0));
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err.message);
  process.exit(1);
});
