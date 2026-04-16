import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET!;
const TOKEN_EXPIRY = "7d";

export const ADMIN_TOKEN = "luxe_admin_token";
export const USER_TOKEN = "luxe_user_token";
export const TOKEN_NAME = ADMIN_TOKEN; // backward compat

// ─── Admin ─────────────────────────────────────────────────────────────────────

interface AdminJWTPayload {
  email: string;
  role: "admin";
  iat?: number;
  exp?: number;
}

export function signToken(payload: { email: string; role: "admin" }): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });
}

export function verifyToken(token: string): AdminJWTPayload | null {
  try { return jwt.verify(token, JWT_SECRET) as AdminJWTPayload; } catch { return null; }
}

export function isAdminAuthenticated(req: NextRequest): AdminJWTPayload | null {
  const token =
    req.cookies.get(ADMIN_TOKEN)?.value ||
    req.headers.get("authorization")?.replace("Bearer ", "");
  if (!token) return null;
  try {
    const p = jwt.verify(token, JWT_SECRET) as AdminJWTPayload;
    return p.role === "admin" ? p : null;
  } catch { return null; }
}

// ─── User ──────────────────────────────────────────────────────────────────────

export interface UserJWTPayload {
  userId: string;
  email: string;
  name: string;
  role: "user";
  iat?: number;
  exp?: number;
}

export function signUserToken(payload: Omit<UserJWTPayload, "role" | "iat" | "exp">): string {
  return jwt.sign({ ...payload, role: "user" }, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });
}

export function getUserFromRequest(req: NextRequest): UserJWTPayload | null {
  const token =
    req.cookies.get(USER_TOKEN)?.value ||
    req.headers.get("authorization")?.replace("Bearer ", "");
  if (!token) return null;
  try {
    const p = jwt.verify(token, JWT_SECRET) as UserJWTPayload;
    return p.role === "user" ? p : null;
  } catch { return null; }
}
