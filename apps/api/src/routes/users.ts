import { Router } from "express";
import { z } from "zod";

import { requireAuth, requireRole } from "../middleware/auth";
import { Batch } from "../models/Batch";
import { Department } from "../models/Department";
import { User } from "../models/User";
import { hashPassword } from "../utils/auth";

const router = Router();

const userSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  role: z.enum(["admin", "faculty", "staff", "student"]),
  departmentId: z.string().optional(),
  batchId: z.string().optional(),
  rollNumber: z.string().optional(),
  password: z.string().min(6),
});

const importSchema = z.object({
  csv: z.string().min(1),
});

router.get("/", requireAuth, requireRole(["admin"]), async (_req, res) => {
  const users = await User.find().sort({ createdAt: -1 });
  return res.json(users);
});

router.post("/", requireAuth, requireRole(["admin"]), async (req, res) => {
  const parsed = userSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid payload" });
  }
  const existing = await User.findOne({ email: parsed.data.email });
  if (existing) {
    return res.status(409).json({ error: "Email already in use" });
  }
  const departmentId = parsed.data.departmentId?.trim() || null;
  const batchId = parsed.data.batchId?.trim() || null;
  const rollNumber = parsed.data.rollNumber?.trim() || null;
  const passwordHash = await hashPassword(parsed.data.password);
  const user = await User.create({
    name: parsed.data.name,
    email: parsed.data.email,
    passwordHash,
    role: parsed.data.role,
    departmentId,
    batchId,
    rollNumber,
  });
  return res.status(201).json(user);
});

router.post("/import", requireAuth, requireRole(["admin"]), async (req, res) => {
  const parsed = importSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid payload" });
  }

  const lines = parsed.data.csv.trim().split(/\r?\n/);
  if (lines.length < 2) {
    return res.status(400).json({ error: "CSV must include header and at least one row" });
  }

  const headers = lines[0].split(",").map((header) => header.trim());
  const rows = lines.slice(1).map((line) => line.split(",").map((cell) => cell.trim()));

  const required = ["name", "email", "role", "password"];
  for (const key of required) {
    if (!headers.includes(key)) {
      return res.status(400).json({ error: `Missing required column: ${key}` });
    }
  }

  const results: Array<{ email: string; status: string; error?: string }> = [];

  for (const row of rows) {
    const data: Record<string, string> = {};
    headers.forEach((header, index) => {
      data[header] = row[index] ?? "";
    });

    if (!data.email) {
      results.push({ email: "", status: "skipped", error: "Missing email" });
      continue;
    }

    const exists = await User.findOne({ email: data.email });
    if (exists) {
      results.push({ email: data.email, status: "skipped", error: "Email already exists" });
      continue;
    }

    const department = data.departmentCode
      ? await Department.findOne({ code: data.departmentCode })
      : null;
    const batch = data.batchName ? await Batch.findOne({ name: data.batchName }) : null;

    const passwordHash = await hashPassword(data.password || "changeme123");

    await User.create({
      name: data.name,
      email: data.email,
      passwordHash,
      role: data.role || "student",
      departmentId: department?.id ?? null,
      batchId: batch?.id ?? null,
      rollNumber: data.rollNumber || null,
    });

    results.push({ email: data.email, status: "created" });
  }

  return res.status(201).json({ results });
});

export default router;
