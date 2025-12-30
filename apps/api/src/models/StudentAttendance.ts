import mongoose, { Schema } from "mongoose";

export interface StudentAttendanceDocument extends mongoose.Document {
  sessionId: mongoose.Types.ObjectId;
  studentId: mongoose.Types.ObjectId;
  date: string;
  status: "present" | "late" | "excused" | "absent";
  checkInAt?: string | null;
}

const StudentAttendanceSchema = new Schema<StudentAttendanceDocument>(
  {
    sessionId: { type: Schema.Types.ObjectId, ref: "Session", required: true },
    studentId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: String, required: true },
    status: { type: String, required: true, enum: ["present", "late", "excused", "absent"] },
    checkInAt: { type: String, default: null },
  },
  { timestamps: true }
);

StudentAttendanceSchema.index({ sessionId: 1, studentId: 1, date: 1 }, { unique: true });

export const StudentAttendance = mongoose.model<StudentAttendanceDocument>(
  "StudentAttendance",
  StudentAttendanceSchema
);
