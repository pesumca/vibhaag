import request from "supertest";

import { createApp } from "./app";
import { ensureTestDb } from "./test-helpers";
import { User } from "./models/User";
import { hashPassword } from "./utils/auth";

const app = createApp();

async function login() {
  const res = await request(app)
    .post("/auth/login")
    .send({ email: "admin@vibhaag.dev", password: "admin123" });
  return res.body.token as string;
}

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

test("create user", async () => {
  const token = await login();
  const res = await request(app)
    .post("/users")
    .set("Authorization", `Bearer ${token}`)
    .send({
      name: "Demo Student",
      email: "demo.student@school.edu",
      role: "student",
      rollNumber: "DEMO-001",
      password: "demo123",
    });

  expect(res.status).toBe(201);
  expect(res.body.email).toBe("demo.student@school.edu");
});

