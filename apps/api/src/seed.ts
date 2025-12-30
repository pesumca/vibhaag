import dayjs from "dayjs";

import { connectDb } from "./db";
import { Attendance } from "./models/Attendance";
import { Batch } from "./models/Batch";
import { Course } from "./models/Course";
import { Department } from "./models/Department";
import { Session } from "./models/Session";
import { User } from "./models/User";
import { hashPassword } from "./utils/auth";

async function seed() {
  await connectDb();

  await Promise.all([
    Attendance.deleteMany({}),
    Session.deleteMany({}),
    Batch.deleteMany({}),
    Course.deleteMany({}),
    Department.deleteMany({}),
    User.deleteMany({}),
  ]);

  const adminPassword = await hashPassword("admin123");
  const facultyPassword = await hashPassword("faculty123");

  const [admin, faculty1, faculty2] = await User.create([
    { name: "Admin User", email: "admin@vibhaag.dev", passwordHash: adminPassword, role: "admin" },
    { name: "Dr. Rhea Pai", email: "rhea@vibhaag.dev", passwordHash: facultyPassword, role: "faculty" },
    { name: "Prof. Arjun Rao", email: "arjun@vibhaag.dev", passwordHash: facultyPassword, role: "faculty" },
  ]);

  const [cs, design] = await Department.create([
    { name: "Computer Science", code: "CSE" },
    { name: "Design & Media", code: "DM" },
  ]);

  const [algo, networks, ux] = await Course.create([
    { name: "Algorithms", code: "CSE201", departmentId: cs.id },
    { name: "Computer Networks", code: "CSE310", departmentId: cs.id },
    { name: "Experience Design", code: "DM210", departmentId: design.id },
  ]);

  const [batch2026, batch2025] = await Batch.create([
    { name: "CSE 2026", year: 2026, departmentId: cs.id },
    { name: "DM 2025", year: 2025, departmentId: design.id },
  ]);

  const [session1, session2, session3] = await Session.create([
    {
      title: "Algo Foundations",
      courseId: algo.id,
      batchId: batch2026.id,
      dayOfWeek: 1,
      startTime: "09:00",
      endTime: "10:30",
      room: "Lab 2A",
    },
    {
      title: "Network Lab",
      courseId: networks.id,
      batchId: batch2026.id,
      dayOfWeek: 3,
      startTime: "14:00",
      endTime: "15:30",
      room: "Lab 3B",
    },
    {
      title: "Studio Workshop",
      courseId: ux.id,
      batchId: batch2025.id,
      dayOfWeek: 2,
      startTime: "11:00",
      endTime: "12:30",
      room: "Studio 1",
    },
  ]);

  const today = dayjs().format("YYYY-MM-DD");
  const yesterday = dayjs().subtract(1, "day").format("YYYY-MM-DD");

  await Attendance.create([
    {
      sessionId: session1.id,
      facultyId: faculty1.id,
      date: today,
      status: "checked-in",
      checkInAt: dayjs().subtract(30, "minute").toISOString(),
      checkOutAt: null,
      durationMinutes: null,
    },
    {
      sessionId: session2.id,
      facultyId: faculty2.id,
      date: yesterday,
      status: "checked-out",
      checkInAt: dayjs().subtract(1, "day").subtract(90, "minute").toISOString(),
      checkOutAt: dayjs().subtract(1, "day").toISOString(),
      durationMinutes: 90,
    },
    {
      sessionId: session3.id,
      facultyId: faculty1.id,
      date: yesterday,
      status: "checked-out",
      checkInAt: dayjs().subtract(1, "day").subtract(75, "minute").toISOString(),
      checkOutAt: dayjs().subtract(1, "day").toISOString(),
      durationMinutes: 75,
    },
  ]);

  console.log("Seed complete. Admin login: admin@vibhaag.dev / admin123");
  console.log("Faculty login: rhea@vibhaag.dev / faculty123");
  console.log("Faculty login: arjun@vibhaag.dev / faculty123");

  await admin.save();
  await faculty1.save();
  await faculty2.save();
}

seed()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
