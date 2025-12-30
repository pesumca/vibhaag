import fs from "node:fs";

import dotenv from "dotenv";

const envPath =
  process.env.DOTENV_FILE ??
  (fs.existsSync(".env") ? ".env" : fs.existsSync(".env.example") ? ".env.example" : undefined);

if (envPath) {
  dotenv.config({ path: envPath });
}

export const config = {
  port: Number(process.env.PORT ?? 4000),
  mongoUrl: process.env.MONGO_URL ?? "mongodb://mongo:27017/vibhaag",
  jwtSecret: process.env.JWT_SECRET ?? "dev-secret-change-me",
  corsOrigin: process.env.CORS_ORIGIN ?? "http://localhost:5173",
  corsOrigins: (process.env.CORS_ORIGIN ?? "http://localhost:5173")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
};
