import mongoose, { Schema } from "mongoose";

export interface SessionDocument extends mongoose.Document {
  title: string;
  courseId: mongoose.Types.ObjectId;
  batchId: mongoose.Types.ObjectId;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  room?: string;
}

const SessionSchema = new Schema<SessionDocument>(
  {
    title: { type: String, required: true },
    courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    batchId: { type: Schema.Types.ObjectId, ref: "Batch", required: true },
    dayOfWeek: { type: Number, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    room: { type: String },
  },
  { timestamps: true }
);

export const Session = mongoose.model<SessionDocument>("Session", SessionSchema);
