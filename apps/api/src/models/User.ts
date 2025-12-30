import mongoose, { Schema } from "mongoose";

export type UserRole = "admin" | "faculty" | "staff" | "student";

export interface UserDocument extends mongoose.Document {
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  departmentId?: mongoose.Types.ObjectId | null;
  batchId?: mongoose.Types.ObjectId | null;
  rollNumber?: string | null;
}

const UserSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String, required: true },
    role: { type: String, required: true, enum: ["admin", "faculty", "staff", "student"] },
    departmentId: { type: Schema.Types.ObjectId, ref: "Department", default: null },
    batchId: { type: Schema.Types.ObjectId, ref: "Batch", default: null },
    rollNumber: { type: String, default: null },
  },
  { timestamps: true }
);

export const User = mongoose.model<UserDocument>("User", UserSchema);
