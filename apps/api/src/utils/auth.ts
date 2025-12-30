import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { config } from "../config";

export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export function signToken(userId: string, role: string) {
  return jwt.sign({ sub: userId, role }, config.jwtSecret, { expiresIn: "7d" });
}
