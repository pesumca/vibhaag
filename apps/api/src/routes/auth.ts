import { Router } from "express";
import { z } from "zod";

import { requireAuth, requireRole } from "../middleware/auth";
import { User } from "../models/User";
import { hashPassword, signToken, verifyPassword } from "../utils/auth";

const router = Router();

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const registerSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(["admin", "faculty", "staff", "student"]).default("faculty"),
  departmentId: z.string().optional(),
  batchId: z.string().optional(),
  rollNumber: z.string().optional(),
});

router.post("/login", async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid payload" });
  }
  const user = await User.findOne({ email: parsed.data.email });
  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }
  const ok = await verifyPassword(parsed.data.password, user.passwordHash);
  if (!ok) {
    return res.status(401).json({ error: "Invalid credentials" });
  }
  const token = signToken(user.id, user.role);
  return res.json({
    token,
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
  });
});

router.post("/bootstrap", async (req, res) => {
  const hasUsers = (await User.countDocuments()) > 0;
  if (hasUsers) {
    return res.status(400).json({ error: "Bootstrap already completed" });
  }
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid payload" });
  }
  const passwordHash = await hashPassword(parsed.data.password);
  const user = await User.create({
    name: parsed.data.name,
    email: parsed.data.email,
    passwordHash,
    role: "admin",
  });
  const token = signToken(user.id, user.role);
  return res.status(201).json({
    token,
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
  });
});

router.get("/status", async (_req, res) => {
  const hasUsers = (await User.countDocuments()) > 0;
  return res.json({ hasUsers });
});

router.post("/register", requireAuth, requireRole(["admin"]), async (req, res) => {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid payload" });
  }
  const existing = await User.findOne({ email: parsed.data.email });
  if (existing) {
    return res.status(409).json({ error: "Email already in use" });
  }
  const passwordHash = await hashPassword(parsed.data.password);
  const user = await User.create({
    name: parsed.data.name,
    email: parsed.data.email,
    passwordHash,
    role: parsed.data.role,
    departmentId: parsed.data.departmentId ?? null,
    batchId: parsed.data.batchId ?? null,
    rollNumber: parsed.data.rollNumber ?? null,
  });
  return res.status(201).json({
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
  });
});

router.get("/me", requireAuth, async (req, res) => {
  const user = await User.findById(req.user?.id).select("name email role");
  if (!user) {
    return res.status(404).json({ error: "Not found" });
  }
  return res.json({ id: user.id, name: user.name, email: user.email, role: user.role });
});

export default router;
