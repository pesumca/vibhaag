import { Router } from "express";
import { z } from "zod";

import { requireAuth, requireRole } from "../middleware/auth";
import { Batch } from "../models/Batch";

const router = Router();

const batchSchema = z.object({
  name: z.string().min(1),
  year: z.number().int(),
  departmentId: z.string().min(1),
});

router.get("/", requireAuth, async (_req, res) => {
  const batches = await Batch.find().sort({ year: -1 });
  return res.json(batches);
});

router.post("/", requireAuth, requireRole(["admin"]), async (req, res) => {
  const parsed = batchSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid payload" });
  }
  const batch = await Batch.create(parsed.data);
  return res.status(201).json(batch);
});

export default router;
