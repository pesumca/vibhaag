import { Router } from "express";
import { z } from "zod";

import { requireAuth, requireRole } from "../middleware/auth";
import { Department } from "../models/Department";

const router = Router();

const departmentSchema = z.object({
  name: z.string().min(1),
  code: z.string().min(2),
});

router.get("/", requireAuth, async (_req, res) => {
  const departments = await Department.find().sort({ name: 1 });
  return res.json(departments);
});

router.post("/", requireAuth, requireRole(["admin"]), async (req, res) => {
  const parsed = departmentSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid payload" });
  }
  const department = await Department.create(parsed.data);
  return res.status(201).json(department);
});

export default router;
