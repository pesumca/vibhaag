import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "tests/ui",
  timeout: 60_000,
  use: {
    baseURL: process.env.UI_BASE_URL ?? "http://vibhaag.localhost",
    viewport: { width: 1280, height: 800 },
  },
});
