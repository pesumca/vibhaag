import request from "supertest";

import { createApp } from "./app";
import { ensureTestDb } from "./test-helpers";
import { Announcement } from "./models/Announcement";
import { Attendance } from "./models/Attendance";
import { Batch } from "./models/Batch";
import { Course } from "./models/Course";
import { Department } from "./models/Department";
import { Feedback } from "./models/Feedback";
import { LeaveRequest } from "./models/LeaveRequest";
import { Session } from "./models/Session";
import { StudentAttendance } from "./models/StudentAttendance";
import { User } from "./models/User";
import { hashPassword } from "./utils/auth";

const app = createApp();

let adminToken = "";
let studentToken = "";
let sessionId = "";
let departmentId = "";
let batchId = "";

async function login(email: string, password: string) {
  const res = await request(app).post("/auth/login").send({ email, password });
  return res.body.token as string;
}

beforeAll(async () => {
  await ensureTestDb();
  await Promise.all([
    Announcement.deleteMany({}),
    Attendance.deleteMany({}),
    Batch.deleteMany({}),
    Course.deleteMany({}),
    Department.deleteMany({}),
    Feedback.deleteMany({}),
    LeaveRequest.deleteMany({}),
    Session.deleteMany({}),
    StudentAttendance.deleteMany({}),
    User.deleteMany({}),
  ]);

  const adminPassword = await hashPassword("admin123");
  const studentPassword = await hashPassword("student123");

  const [admin, student] = await User.create([
    { name: "Admin User", email: "admin@vibhaag.dev", passwordHash: adminPassword, role: "admin" },
    { name: "Student User", email: "student@vibhaag.dev", passwordHash: studentPassword, role: "student" },
  ]);

  const [department] = await Department.create([{ name: "Computer Science", code: "CSE" }]);
  departmentId = department.id;

  const [batch] = await Batch.create([{ name: "CSE 2026", year: 2026, departmentId: department.id }]);
  batchId = batch.id;

  await User.findByIdAndUpdate(student.id, { departmentId: department.id, batchId: batch.id });

  const [course] = await Course.create([{ name: "Algorithms", code: "CSE201", departmentId: department.id }]);

  const [session] = await Session.create([
    {
      title: "Algo Foundations",
      courseId: course.id,
      batchId: batch.id,
      dayOfWeek: 1,
      startTime: "09:00",
      endTime: "10:00",
    },
  ]);

  sessionId = session.id;

  await Announcement.create([
    { title: "All hands", body: "Campus closed Friday", audience: "all", audienceRef: null, authorId: admin.id },
    {
      title: "Dept update",
      body: "CSE lab maintenance",
      audience: "department",
      audienceRef: department.id,
      authorId: admin.id,
    },
    {
      title: "Batch update",
      body: "CSE 2026 demo day",
      audience: "batch",
      audienceRef: batch.id,
      authorId: admin.id,
    },
  ]);

  adminToken = await login("admin@vibhaag.dev", "admin123");
  studentToken = await login("student@vibhaag.dev", "student123");
});

test("student sees targeted announcements", async () => {
  const res = await request(app).get("/announcements").set("Authorization", `Bearer ${studentToken}`);
  expect(res.status).toBe(200);
  expect(res.body.length).toBe(3);
});

test("student leave request flow", async () => {
  const res = await request(app)
    .post("/leave-requests")
    .set("Authorization", `Bearer ${studentToken}`)
    .send({ sessionId, date: "2026-01-10", reason: "Medical" });

  expect(res.status).toBe(201);

  const approve = await request(app)
    .patch(`/leave-requests/${res.body._id}`)
    .set("Authorization", `Bearer ${adminToken}`)
    .send({ status: "approved" });

  expect(approve.status).toBe(200);
  expect(approve.body.status).toBe("approved");
});

test("student attendance check-in", async () => {
  const res = await request(app)
    .post("/student/attendance/check-in")
    .set("Authorization", `Bearer ${studentToken}`)
    .send({ sessionId });

  expect(res.status).toBe(201);
  expect(res.body.status).toBe("present");
});
