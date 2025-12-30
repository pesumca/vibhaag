import { Router } from "express";
import { z } from "zod";

import { requireAuth, requireRole } from "../middleware/auth";
import { LeaveRequest } from "../models/LeaveRequest";

const router = Router();

const createSchema = z.object({
  sessionId: z.string().min(1),
  date: z.string().min(8),
  reason: z.string().min(6),
});

const updateSchema = z.object({
  status: z.enum(["approved", "denied"]),
});

router.get("/", requireAuth, async (req, res) => {
  const role = req.user?.role;
  if (role === "student") {
    const requests = await LeaveRequest.find({ studentId: req.user?.id }).sort({ createdAt: -1 });
    return res.json(requests);
  }
  const status = req.query.status ? String(req.query.status) : undefined;
  const query = status ? { status } : {};
  const requests = await LeaveRequest.find(query).sort({ createdAt: -1 });
  return res.json(requests);
});

router.post("/", requireAuth, requireRole(["student"]), async (req, res) => {
  const parsed = createSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid payload" });
  }
  const request = await LeaveRequest.create({
    studentId: req.user?.id,
    sessionId: parsed.data.sessionId,
    date: parsed.data.date,
    reason: parsed.data.reason,
    status: "pending",
  });
  return res.status(201).json(request);
});

router.patch("/:id", requireAuth, requireRole(["admin", "faculty", "staff"]), async (req, res) => {
  const parsed = updateSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid payload" });
  }
  const request = await LeaveRequest.findById(req.params.id);
  if (!request) {
    return res.status(404).json({ error: "Leave request not found" });
  }
  request.status = parsed.data.status;
  request.reviewerId = req.user?.id ?? null;
  await request.save();
  return res.json(request);
});

export default router;
