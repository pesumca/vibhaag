import mongoose, { Schema } from "mongoose";

export interface FeedbackDocument extends mongoose.Document {
  sessionId: mongoose.Types.ObjectId;
  studentId: mongoose.Types.ObjectId;
  rating: number;
  comment?: string | null;
}

const FeedbackSchema = new Schema<FeedbackDocument>(
  {
    sessionId: { type: Schema.Types.ObjectId, ref: "Session", required: true },
    studentId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, default: null },
  },
  { timestamps: true }
);

FeedbackSchema.index({ sessionId: 1, studentId: 1 }, { unique: true });

export const Feedback = mongoose.model<FeedbackDocument>("Feedback", FeedbackSchema);
