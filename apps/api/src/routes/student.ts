import { Router } from "express";
import dayjs from "dayjs";
import { z } from "zod";

import { requireAuth, requireRole } from "../middleware/auth";
import { Session } from "../models/Session";
import { StudentAttendance } from "../models/StudentAttendance";
import { User } from "../models/User";

const router = Router();

const checkInSchema = z.object({
  sessionId: z.string().min(1),
});

router.get("/schedule", requireAuth, requireRole(["student"]), async (req, res) => {
  const user = await User.findById(req.user?.id).select("batchId");
  if (!user?.batchId) {
    return res.status(400).json({ error: "Student batch not set" });
  }
  const sessions = await Session.find({ batchId: user.batchId }).sort({ dayOfWeek: 1, startTime: 1 });
  return res.json(sessions);
});

router.get("/attendance", requireAuth, requireRole(["student"]), async (req, res) => {
  const from = req.query.from ? String(req.query.from) : dayjs().subtract(7, "day").format("YYYY-MM-DD");
  const to = req.query.to ? String(req.query.to) : dayjs().format("YYYY-MM-DD");
  const attendance = await StudentAttendance.find({
    studentId: req.user?.id,
    date: { $gte: from, $lte: to },
  }).sort({ date: -1 });
  return res.json(attendance);
});

router.post("/attendance/check-in", requireAuth, requireRole(["student"]), async (req, res) => {
  const parsed = checkInSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid payload" });
  }
  const date = dayjs().format("YYYY-MM-DD");
  const now = dayjs().toISOString();
  const attendance = await StudentAttendance.findOneAndUpdate(
    { sessionId: parsed.data.sessionId, studentId: req.user?.id, date },
    { sessionId: parsed.data.sessionId, studentId: req.user?.id, date, status: "present", checkInAt: now },
    { upsert: true, new: true }
  );
  return res.status(201).json(attendance);
});

export default router;
