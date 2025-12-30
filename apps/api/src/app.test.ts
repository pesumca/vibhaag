import request from "supertest";

import { createApp } from "./app";
import { ensureTestDb } from "./test-helpers";
import { User } from "./models/User";
import { hashPassword } from "./utils/auth";

const app = createApp();

beforeAll(async () => {
  await ensureTestDb();
  await User.deleteMany({});
  const passwordHash = await hashPassword("admin123");
  await User.create({
    name: "Admin User",
    email: "admin@vibhaag.dev",
    passwordHash,
    role: "admin",
  });
});

afterAll(async () => {
  await User.deleteMany({});
});

test("health check", async () => {
  const res = await request(app).get("/health");
  expect(res.status).toBe(200);
  expect(res.body).toEqual({ status: "ok" });
});

test("auth status reflects existing users", async () => {
  const res = await request(app).get("/auth/status");
  expect(res.status).toBe(200);
  expect(res.body.hasUsers).toBe(true);
});

test("login returns token", async () => {
  const res = await request(app).post("/auth/login").send({ email: "admin@vibhaag.dev", password: "admin123" });
  expect(res.status).toBe(200);
  expect(res.body.token).toBeTruthy();
});
