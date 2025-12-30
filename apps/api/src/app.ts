import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

import { config } from "./config";
import authRoutes from "./routes/auth";
import attendanceRoutes from "./routes/attendance";
import batchRoutes from "./routes/batches";
import courseRoutes from "./routes/courses";
import departmentRoutes from "./routes/departments";
import analyticsRoutes from "./routes/analytics";
import sessionRoutes from "./routes/sessions";

export function createApp() {
  const app = express();
  app.use(helmet());
  app.use(cors({ origin: config.corsOrigin, credentials: true }));
  app.use(express.json({ limit: "1mb" }));
  app.use(morgan("dev"));

  app.get("/health", (_req, res) => res.json({ status: "ok" }));

  app.use("/auth", authRoutes);
  app.use("/departments", departmentRoutes);
  app.use("/courses", courseRoutes);
  app.use("/batches", batchRoutes);
  app.use("/sessions", sessionRoutes);
  app.use("/attendance", attendanceRoutes);
  app.use("/analytics", analyticsRoutes);

  return app;
}
