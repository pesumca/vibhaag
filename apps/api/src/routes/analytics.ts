import { Router } from "express";
import dayjs from "dayjs";

import { requireAuth, requireRole } from "../middleware/auth";
import { Attendance } from "../models/Attendance";
import { Feedback } from "../models/Feedback";
import { LeaveRequest } from "../models/LeaveRequest";
import { Session } from "../models/Session";
import { User } from "../models/User";

const router = Router();

router.get("/overview", requireAuth, requireRole(["admin"]), async (_req, res) => {
  const since = dayjs().subtract(7, "day").format("YYYY-MM-DD");
  const totalSessions = await Session.countDocuments();
  const totalFaculty = await User.countDocuments({ role: "faculty" });
  const totalStudents = await User.countDocuments({ role: "student" });
  const attendance = await Attendance.find({ date: { $gte: since } });
  const checkedOut = attendance.filter((record) => record.status === "checked-out").length;
  const attendanceRate = attendance.length === 0 ? 0 : Math.round((checkedOut / attendance.length) * 100);
  const pendingLeaves = await LeaveRequest.countDocuments({ status: "pending" });
  const feedback = await Feedback.find();
  const feedbackAvg =
    feedback.length === 0 ? 0 : Math.round((feedback.reduce((sum, item) => sum + item.rating, 0) / feedback.length) * 10) / 10;
  return res.json({
    totalSessions,
    totalFaculty,
    totalStudents,
    last7Days: {
      totalRecords: attendance.length,
      checkedOut,
      attendanceRate,
    },
    signals: {
      pendingLeaves,
      feedbackAvg,
    },
  });
});

export default router;
