import { Router } from "express";
import dayjs from "dayjs";
import { z } from "zod";

import { requireAuth, requireRole } from "../middleware/auth";
import { Attendance } from "../models/Attendance";
import { Session } from "../models/Session";

const router = Router();

const checkInSchema = z.object({
  sessionId: z.string().min(1),
});

const checkOutSchema = z.object({
  attendanceId: z.string().min(1),
});

router.get("/me", requireAuth, async (req, res) => {
  const from = req.query.from ? String(req.query.from) : dayjs().subtract(7, "day").format("YYYY-MM-DD");
  const to = req.query.to ? String(req.query.to) : dayjs().format("YYYY-MM-DD");
  const attendance = await Attendance.find({
    facultyId: req.user?.id,
    date: { $gte: from, $lte: to },
  }).sort({ date: -1 });
  return res.json(attendance);
});

router.post("/check-in", requireAuth, requireRole(["faculty", "admin", "staff"]), async (req, res) => {
  const parsed = checkInSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid payload" });
  }
  const session = await Session.findById(parsed.data.sessionId);
  if (!session) {
    return res.status(404).json({ error: "Session not found" });
  }
  const date = dayjs().format("YYYY-MM-DD");
  const now = dayjs().toISOString();
  const attendance = await Attendance.findOneAndUpdate(
    { sessionId: session.id, facultyId: req.user?.id, date },
    {
      sessionId: session.id,
      facultyId: req.user?.id,
      date,
      status: "checked-in",
      checkInAt: now,
    },
    { upsert: true, new: true }
  );
  return res.status(201).json(attendance);
});

router.post("/check-out", requireAuth, requireRole(["faculty", "admin", "staff"]), async (req, res) => {
  const parsed = checkOutSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid payload" });
  }
  const attendance = await Attendance.findById(parsed.data.attendanceId);
  if (!attendance) {
    return res.status(404).json({ error: "Attendance not found" });
  }
  if (attendance.facultyId.toString() !== req.user?.id) {
    return res.status(403).json({ error: "Forbidden" });
  }
  const now = dayjs();
  const checkIn = attendance.checkInAt ? dayjs(attendance.checkInAt) : now;
  const durationMinutes = Math.max(now.diff(checkIn, "minute"), 0);
  attendance.status = "checked-out";
  attendance.checkOutAt = now.toISOString();
  attendance.durationMinutes = durationMinutes;
  await attendance.save();
  return res.json(attendance);
});

export default router;
