import mongoose, { Schema } from "mongoose";

export interface BatchDocument extends mongoose.Document {
  name: string;
  year: number;
  departmentId: mongoose.Types.ObjectId;
}

const BatchSchema = new Schema<BatchDocument>(
  {
    name: { type: String, required: true },
    year: { type: Number, required: true },
    departmentId: { type: Schema.Types.ObjectId, ref: "Department", required: true },
  },
  { timestamps: true }
);

export const Batch = mongoose.model<BatchDocument>("Batch", BatchSchema);
