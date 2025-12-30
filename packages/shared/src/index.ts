import { z } from "zod";

export const RoleSchema = z.enum(["admin", "faculty", "staff", "student"]);
export type Role = z.infer<typeof RoleSchema>;

export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  role: RoleSchema,
});
export type User = z.infer<typeof UserSchema>;

export const AnnouncementSchema = z.object({
  id: z.string(),
  title: z.string(),
  body: z.string(),
  audience: z.enum(["all", "department", "batch"]),
  audienceRef: z.string().nullable(),
  authorId: z.string(),
  createdAt: z.string(),
});
export type Announcement = z.infer<typeof AnnouncementSchema>;

export const LeaveRequestSchema = z.object({
  id: z.string(),
  studentId: z.string(),
  sessionId: z.string(),
  date: z.string(),
  reason: z.string(),
  status: z.enum(["pending", "approved", "denied"]),
  reviewerId: z.string().nullable(),
  createdAt: z.string(),
});
export type LeaveRequest = z.infer<typeof LeaveRequestSchema>;

export const FeedbackSchema = z.object({
  id: z.string(),
  sessionId: z.string(),
  studentId: z.string(),
  rating: z.number().min(1).max(5),
  comment: z.string().nullable(),
  createdAt: z.string(),
});
export type Feedback = z.infer<typeof FeedbackSchema>;

export const DepartmentSchema = z.object({
  id: z.string(),
  name: z.string(),
  code: z.string(),
});
export type Department = z.infer<typeof DepartmentSchema>;

export const CourseSchema = z.object({
  id: z.string(),
  name: z.string(),
  code: z.string(),
  departmentId: z.string(),
});
export type Course = z.infer<typeof CourseSchema>;

export const BatchSchema = z.object({
  id: z.string(),
  name: z.string(),
  year: z.number(),
  departmentId: z.string(),
});
export type Batch = z.infer<typeof BatchSchema>;

export const SessionSchema = z.object({
  id: z.string(),
  title: z.string(),
  courseId: z.string(),
  batchId: z.string(),
  dayOfWeek: z.number().min(0).max(6),
  startTime: z.string(),
  endTime: z.string(),
});
export type Session = z.infer<typeof SessionSchema>;

export const AttendanceSchema = z.object({
  id: z.string(),
  sessionId: z.string(),
  facultyId: z.string(),
  date: z.string(),
  status: z.enum(["checked-in", "checked-out", "missed"]),
  checkInAt: z.string().nullable(),
  checkOutAt: z.string().nullable(),
  durationMinutes: z.number().nullable(),
});
export type Attendance = z.infer<typeof AttendanceSchema>;

export const AuthResponseSchema = z.object({
  token: z.string(),
  user: UserSchema,
});
export type AuthResponse = z.infer<typeof AuthResponseSchema>;
