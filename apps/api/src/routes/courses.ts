import { Router } from "express";
import { z } from "zod";

import { requireAuth, requireRole } from "../middleware/auth";
import { Course } from "../models/Course";

const router = Router();

const courseSchema = z.object({
  name: z.string().min(1),
  code: z.string().min(2),
  departmentId: z.string().min(1),
});

router.get("/", requireAuth, async (_req, res) => {
  const courses = await Course.find().sort({ name: 1 });
  return res.json(courses);
});

router.post("/", requireAuth, requireRole(["admin"]), async (req, res) => {
  const parsed = courseSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid payload" });
  }
  const course = await Course.create(parsed.data);
  return res.status(201).json(course);
});

export default router;
