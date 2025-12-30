import { z } from "zod";

export const RoleSchema = z.enum(["admin", "faculty", "staff"]);
export type Role = z.infer<typeof RoleSchema>;

export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  role: RoleSchema,
});
export type User = z.infer<typeof UserSchema>;

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
