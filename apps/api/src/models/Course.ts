import mongoose, { Schema } from "mongoose";

export interface CourseDocument extends mongoose.Document {
  name: string;
  code: string;
  departmentId: mongoose.Types.ObjectId;
}

const CourseSchema = new Schema<CourseDocument>(
  {
    name: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    departmentId: { type: Schema.Types.ObjectId, ref: "Department", required: true },
  },
  { timestamps: true }
);

export const Course = mongoose.model<CourseDocument>("Course", CourseSchema);
