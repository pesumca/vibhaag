import mongoose, { Schema } from "mongoose";

export interface AttendanceDocument extends mongoose.Document {
  sessionId: mongoose.Types.ObjectId;
  facultyId: mongoose.Types.ObjectId;
  date: string;
  status: "checked-in" | "checked-out" | "missed";
  checkInAt?: string | null;
  checkOutAt?: string | null;
  durationMinutes?: number | null;
}

const AttendanceSchema = new Schema<AttendanceDocument>(
  {
    sessionId: { type: Schema.Types.ObjectId, ref: "Session", required: true },
    facultyId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: String, required: true },
    status: { type: String, required: true, enum: ["checked-in", "checked-out", "missed"] },
    checkInAt: { type: String, default: null },
    checkOutAt: { type: String, default: null },
    durationMinutes: { type: Number, default: null },
  },
  { timestamps: true }
);

AttendanceSchema.index({ sessionId: 1, facultyId: 1, date: 1 }, { unique: true });

export const Attendance = mongoose.model<AttendanceDocument>("Attendance", AttendanceSchema);
