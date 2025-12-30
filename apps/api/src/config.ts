import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: Number(process.env.PORT ?? 4000),
  mongoUrl: process.env.MONGO_URL ?? "mongodb://mongo:27017/vibhaag",
  jwtSecret: process.env.JWT_SECRET ?? "dev-secret-change-me",
  corsOrigin: process.env.CORS_ORIGIN ?? "http://localhost:5173",
};
