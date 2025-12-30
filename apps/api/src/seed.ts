import dayjs from "dayjs";

import { connectDb } from "./db";
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

async function seed() {
  await connectDb();

  await Promise.all([
    Announcement.deleteMany({}),
    Feedback.deleteMany({}),
    LeaveRequest.deleteMany({}),
    StudentAttendance.deleteMany({}),
    Attendance.deleteMany({}),
    Session.deleteMany({}),
    Batch.deleteMany({}),
    Course.deleteMany({}),
    Department.deleteMany({}),
    User.deleteMany({}),
  ]);

  const adminPassword = await hashPassword("admin123");
  const facultyPassword = await hashPassword("faculty123");
  const studentPassword = await hashPassword("student123");

  const [admin, faculty1, faculty2, faculty3] = await User.create([
    { name: "Admin User", email: "admin@vibhaag.dev", passwordHash: adminPassword, role: "admin" },
    { name: "Dr. Rhea Pai", email: "rhea@vibhaag.dev", passwordHash: facultyPassword, role: "faculty" },
    { name: "Prof. Arjun Rao", email: "arjun@vibhaag.dev", passwordHash: facultyPassword, role: "faculty" },
    { name: "Dr. Nisha Kapoor", email: "nisha@vibhaag.dev", passwordHash: facultyPassword, role: "faculty" },
  ]);

  const [cs, design, business] = await Department.create([
    { name: "Computer Science", code: "CSE" },
    { name: "Design & Media", code: "DM" },
    { name: "Business Systems", code: "BS" },
  ]);

  const [algo, networks, ux, product, marketing] = await Course.create([
    { name: "Algorithms", code: "CSE201", departmentId: cs.id },
    { name: "Computer Networks", code: "CSE310", departmentId: cs.id },
    { name: "Experience Design", code: "DM210", departmentId: design.id },
    { name: "Product Strategy", code: "BS220", departmentId: business.id },
    { name: "Digital Marketing", code: "BS315", departmentId: business.id },
  ]);

  const [batch2026, batch2025, batch2027, batch2024] = await Batch.create([
    { name: "CSE 2026", year: 2026, departmentId: cs.id },
    { name: "DM 2025", year: 2025, departmentId: design.id },
    { name: "CSE 2027", year: 2027, departmentId: cs.id },
    { name: "BS 2024", year: 2024, departmentId: business.id },
  ]);

  const [session1, session2, session3, session4, session5, session6] = await Session.create([
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
    {
      title: "Product Lab",
      courseId: product.id,
      batchId: batch2024.id,
      dayOfWeek: 4,
      startTime: "10:00",
      endTime: "11:30",
      room: "Boardroom",
    },
    {
      title: "Marketing Sprint",
      courseId: marketing.id,
      batchId: batch2024.id,
      dayOfWeek: 5,
      startTime: "13:00",
      endTime: "14:30",
      room: "War Room",
    },
    {
      title: "Data Structures",
      courseId: algo.id,
      batchId: batch2027.id,
      dayOfWeek: 2,
      startTime: "15:00",
      endTime: "16:30",
      room: "Lab 1C",
    },
  ]);

  const students = await User.create([
    {
      name: "Ira Sharma",
      email: "ira@vibhaag.dev",
      passwordHash: studentPassword,
      role: "student",
      departmentId: cs.id,
      batchId: batch2026.id,
      rollNumber: "CSE26-014",
    },
    {
      name: "Kunal Iyer",
      email: "kunal@vibhaag.dev",
      passwordHash: studentPassword,
      role: "student",
      departmentId: cs.id,
      batchId: batch2026.id,
      rollNumber: "CSE26-021",
    },
    {
      name: "Meera Das",
      email: "meera@vibhaag.dev",
      passwordHash: studentPassword,
      role: "student",
      departmentId: design.id,
      batchId: batch2025.id,
      rollNumber: "DM25-008",
    },
    {
      name: "Arav Patel",
      email: "arav@vibhaag.dev",
      passwordHash: studentPassword,
      role: "student",
      departmentId: design.id,
      batchId: batch2025.id,
      rollNumber: "DM25-013",
    },
    {
      name: "Sneha Roy",
      email: "sneha@vibhaag.dev",
      passwordHash: studentPassword,
      role: "student",
      departmentId: cs.id,
      batchId: batch2027.id,
      rollNumber: "CSE27-003",
    },
    {
      name: "Vikram Nair",
      email: "vikram@vibhaag.dev",
      passwordHash: studentPassword,
      role: "student",
      departmentId: cs.id,
      batchId: batch2027.id,
      rollNumber: "CSE27-009",
    },
    {
      name: "Tara Sen",
      email: "tara@vibhaag.dev",
      passwordHash: studentPassword,
      role: "student",
      departmentId: business.id,
      batchId: batch2024.id,
      rollNumber: "BS24-005",
    },
    {
      name: "Jay Malhotra",
      email: "jay@vibhaag.dev",
      passwordHash: studentPassword,
      role: "student",
      departmentId: business.id,
      batchId: batch2024.id,
      rollNumber: "BS24-017",
    },
  ]);

  const today = dayjs().format("YYYY-MM-DD");
  const yesterday = dayjs().subtract(1, "day").format("YYYY-MM-DD");
  const lastWeek = dayjs().subtract(6, "day").format("YYYY-MM-DD");

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
      facultyId: faculty3.id,
      date: yesterday,
      status: "checked-out",
      checkInAt: dayjs().subtract(1, "day").subtract(75, "minute").toISOString(),
      checkOutAt: dayjs().subtract(1, "day").toISOString(),
      durationMinutes: 75,
    },
    {
      sessionId: session4.id,
      facultyId: faculty3.id,
      date: lastWeek,
      status: "checked-out",
      checkInAt: dayjs().subtract(6, "day").subtract(60, "minute").toISOString(),
      checkOutAt: dayjs().subtract(6, "day").toISOString(),
      durationMinutes: 60,
    },
  ]);

  await StudentAttendance.create([
    {
      sessionId: session1.id,
      studentId: students[0].id,
      date: today,
      status: "present",
      checkInAt: dayjs().subtract(20, "minute").toISOString(),
    },
    {
      sessionId: session1.id,
      studentId: students[1].id,
      date: today,
      status: "late",
      checkInAt: dayjs().subtract(5, "minute").toISOString(),
    },
    {
      sessionId: session3.id,
      studentId: students[2].id,
      date: yesterday,
      status: "present",
      checkInAt: dayjs().subtract(1, "day").subtract(15, "minute").toISOString(),
    },
    {
      sessionId: session4.id,
      studentId: students[6].id,
      date: lastWeek,
      status: "excused",
      checkInAt: null,
    },
  ]);

  await Announcement.create([
    {
      title: "Mid-semester surveys open",
      body: "Share your feedback on course pacing by Friday.",
      audience: "all",
      audienceRef: null,
      authorId: admin.id,
    },
    {
      title: "CSE lab maintenance",
      body: "Lab 2A is closed tomorrow 3-5 PM. Use Lab 1C instead.",
      audience: "department",
      audienceRef: cs.id,
      authorId: faculty1.id,
    },
    {
      title: "BS 2024 product demo",
      body: "Bring your sprint decks for the showcase on Thursday.",
      audience: "batch",
      audienceRef: batch2024.id,
      authorId: faculty3.id,
    },
  ]);

  await LeaveRequest.create([
    {
      studentId: students[0].id,
      sessionId: session2.id,
      date: yesterday,
      reason: "Medical appointment",
      status: "approved",
      reviewerId: faculty2.id,
    },
    {
      studentId: students[2].id,
      sessionId: session3.id,
      date: today,
      reason: "Family function",
      status: "pending",
      reviewerId: null,
    },
  ]);

  await Feedback.create([
    {
      sessionId: session1.id,
      studentId: students[0].id,
      rating: 5,
      comment: "Loved the live coding walkthrough.",
    },
    {
      sessionId: session3.id,
      studentId: students[2].id,
      rating: 4,
      comment: "More critique rounds would be great.",
    },
    {
      sessionId: session4.id,
      studentId: students[6].id,
      rating: 5,
      comment: "Great examples for case studies.",
    },
  ]);

  console.log("Seed complete.");
  console.log("Admin login: admin@vibhaag.dev / admin123");
  console.log("Faculty login: rhea@vibhaag.dev / faculty123");
  console.log("Faculty login: arjun@vibhaag.dev / faculty123");
  console.log("Faculty login: nisha@vibhaag.dev / faculty123");
  console.log("Student login: ira@vibhaag.dev / student123");
  console.log("Student login: meera@vibhaag.dev / student123");

  await admin.save();
  await faculty1.save();
  await faculty2.save();
  await faculty3.save();
}

seed()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
