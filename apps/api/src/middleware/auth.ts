import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { config } from "../config";
import { User } from "../models/User";

export interface AuthRequest extends Request {
  user?: { id: string; role: string };
}

export async function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header) {
    return res.status(401).json({ error: "Missing authorization header" });
  }
  const token = header.replace("Bearer ", "");
  try {
    const payload = jwt.verify(token, config.jwtSecret) as { sub: string; role: string };
    const user = await User.findById(payload.sub).select("_id role");
    if (!user) {
      return res.status(401).json({ error: "Invalid token" });
    }
    req.user = { id: user.id, role: user.role };
    return next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
}

export function requireRole(roles: string[]) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ error: "Forbidden" });
    }
    return next();
  };
}
