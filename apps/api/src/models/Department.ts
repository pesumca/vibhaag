import mongoose, { Schema } from "mongoose";

export interface DepartmentDocument extends mongoose.Document {
  name: string;
  code: string;
}

const DepartmentSchema = new Schema<DepartmentDocument>(
  {
    name: { type: String, required: true },
    code: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export const Department = mongoose.model<DepartmentDocument>("Department", DepartmentSchema);
