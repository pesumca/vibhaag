import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
import fs from "node:fs";
import path from "node:path";

const envPath = path.resolve(process.cwd(), ".env");
const examplePath = path.resolve(process.cwd(), ".env.example");

if (!fs.existsSync(envPath) && fs.existsSync(examplePath)) {
  dotenv.config({ path: examplePath });
}

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
    allowedHosts: ["vibhaag.localhost", "localhost", "127.0.0.1", "web"],
  },
});
