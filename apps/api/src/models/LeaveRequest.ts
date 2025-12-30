import mongoose, { Schema } from "mongoose";

export interface LeaveRequestDocument extends mongoose.Document {
  studentId: mongoose.Types.ObjectId;
  sessionId: mongoose.Types.ObjectId;
  date: string;
  reason: string;
  status: "pending" | "approved" | "denied";
  reviewerId?: mongoose.Types.ObjectId | null;
}

const LeaveRequestSchema = new Schema<LeaveRequestDocument>(
  {
    studentId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    sessionId: { type: Schema.Types.ObjectId, ref: "Session", required: true },
    date: { type: String, required: true },
    reason: { type: String, required: true },
    status: { type: String, required: true, enum: ["pending", "approved", "denied"], default: "pending" },
    reviewerId: { type: Schema.Types.ObjectId, ref: "User", default: null },
  },
  { timestamps: true }
);

LeaveRequestSchema.index({ studentId: 1, sessionId: 1, date: 1 }, { unique: true });

export const LeaveRequest = mongoose.model<LeaveRequestDocument>("LeaveRequest", LeaveRequestSchema);
