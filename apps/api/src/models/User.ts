import mongoose, { Schema } from "mongoose";

export type UserRole = "admin" | "faculty" | "staff";

export interface UserDocument extends mongoose.Document {
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
}

const UserSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String, required: true },
    role: { type: String, required: true, enum: ["admin", "faculty", "staff"] },
  },
  { timestamps: true }
);

export const User = mongoose.model<UserDocument>("User", UserSchema);
