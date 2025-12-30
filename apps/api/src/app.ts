import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";

import { config } from "./config";
import { swaggerSpec } from "./swagger";
import authRoutes from "./routes/auth";
import attendanceRoutes from "./routes/attendance";
import batchRoutes from "./routes/batches";
import courseRoutes from "./routes/courses";
import departmentRoutes from "./routes/departments";
import analyticsRoutes from "./routes/analytics";
import announcementsRoutes from "./routes/announcements";
import feedbackRoutes from "./routes/feedback";
import leaveRequestRoutes from "./routes/leaveRequests";
import sessionRoutes from "./routes/sessions";
import studentRoutes from "./routes/student";
import userRoutes from "./routes/users";

export function createApp() {
  const app = express();
  app.use(helmet());
  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin || config.corsOrigins.includes(origin)) {
          return callback(null, true);
        }
        return callback(new Error("Not allowed by CORS"));
      },
      credentials: true,
    })
  );
  app.use(express.json({ limit: "1mb" }));
  app.use(morgan("dev"));

  app.get("/health", (_req, res) => res.json({ status: "ok" }));
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  app.use("/auth", authRoutes);
  app.use("/departments", departmentRoutes);
  app.use("/courses", courseRoutes);
  app.use("/batches", batchRoutes);
  app.use("/sessions", sessionRoutes);
  app.use("/attendance", attendanceRoutes);
  app.use("/analytics", analyticsRoutes);
  app.use("/announcements", announcementsRoutes);
  app.use("/leave-requests", leaveRequestRoutes);
  app.use("/feedback", feedbackRoutes);
  app.use("/student", studentRoutes);
  app.use("/users", userRoutes);

  return app;
}
