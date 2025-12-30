import { Router } from "express";
import { z } from "zod";

import { requireAuth, requireRole } from "../middleware/auth";
import { Announcement } from "../models/Announcement";
import { User } from "../models/User";

const router = Router();

const announcementSchema = z.object({
  title: z.string().min(2),
  body: z.string().min(3),
  audience: z.enum(["all", "department", "batch"]),
  audienceRef: z.string().optional(),
});

router.get("/", requireAuth, async (req, res) => {
  const user = await User.findById(req.user?.id).select("role departmentId batchId");
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  if (user.role === "student") {
    const filters = [
      { audience: "all" },
      { audience: "department", audienceRef: user.departmentId },
      { audience: "batch", audienceRef: user.batchId },
    ];
    const announcements = await Announcement.find({ $or: filters }).sort({ createdAt: -1 });
    return res.json(announcements);
  }

  const announcements = await Announcement.find().sort({ createdAt: -1 });
  return res.json(announcements);
});

router.post("/", requireAuth, requireRole(["admin", "faculty", "staff"]), async (req, res) => {
  const parsed = announcementSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid payload" });
  }

  if (parsed.data.audience !== "all" && !parsed.data.audienceRef) {
    return res.status(400).json({ error: "Audience reference required" });
  }

  const announcement = await Announcement.create({
    ...parsed.data,
    audienceRef: parsed.data.audience === "all" ? null : parsed.data.audienceRef,
    authorId: req.user?.id,
  });
  return res.status(201).json(announcement);
});

export default router;
