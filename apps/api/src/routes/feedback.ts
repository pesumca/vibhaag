import { Router } from "express";
import { z } from "zod";

import { requireAuth, requireRole } from "../middleware/auth";
import { Feedback } from "../models/Feedback";

const router = Router();

const createSchema = z.object({
  sessionId: z.string().min(1),
  rating: z.number().min(1).max(5),
  comment: z.string().optional(),
});

router.get("/", requireAuth, async (req, res) => {
  const role = req.user?.role;
  const sessionId = req.query.sessionId ? String(req.query.sessionId) : undefined;
  const baseQuery = sessionId ? { sessionId } : {};

  if (role === "student") {
    const feedback = await Feedback.find({ ...baseQuery, studentId: req.user?.id }).sort({ createdAt: -1 });
    return res.json(feedback);
  }

  const feedback = await Feedback.find(baseQuery).sort({ createdAt: -1 });
  return res.json(feedback);
});

router.post("/", requireAuth, requireRole(["student"]), async (req, res) => {
  const parsed = createSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid payload" });
  }
  const feedback = await Feedback.create({
    sessionId: parsed.data.sessionId,
    studentId: req.user?.id,
    rating: parsed.data.rating,
    comment: parsed.data.comment ?? null,
  });
  return res.status(201).json(feedback);
});

export default router;
