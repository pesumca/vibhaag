import { Router } from "express";
import { z } from "zod";

import { requireAuth, requireRole } from "../middleware/auth";
import { Session } from "../models/Session";

const router = Router();

const sessionSchema = z.object({
  title: z.string().min(1),
  courseId: z.string().min(1),
  batchId: z.string().min(1),
  dayOfWeek: z.number().min(0).max(6),
  startTime: z.string().min(4),
  endTime: z.string().min(4),
  room: z.string().optional(),
});

router.get("/", requireAuth, async (_req, res) => {
  const sessions = await Session.find().sort({ dayOfWeek: 1, startTime: 1 });
  return res.json(sessions);
});

router.post("/", requireAuth, requireRole(["admin"]), async (req, res) => {
  const parsed = sessionSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid payload" });
  }
  const session = await Session.create(parsed.data);
  return res.status(201).json(session);
});

export default router;
