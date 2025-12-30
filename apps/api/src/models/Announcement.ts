import mongoose, { Schema } from "mongoose";

export interface AnnouncementDocument extends mongoose.Document {
  title: string;
  body: string;
  audience: "all" | "department" | "batch";
  audienceRef?: mongoose.Types.ObjectId | null;
  authorId: mongoose.Types.ObjectId;
}

const AnnouncementSchema = new Schema<AnnouncementDocument>(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    audience: { type: String, required: true, enum: ["all", "department", "batch"] },
    audienceRef: { type: Schema.Types.ObjectId, default: null },
    authorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export const Announcement = mongoose.model<AnnouncementDocument>("Announcement", AnnouncementSchema);
