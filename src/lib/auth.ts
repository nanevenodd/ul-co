import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-this";

// Default admin credentials (di production, ini harus di environment variables)
const DEFAULT_ADMIN = {
  email: "admin@ulco.com",
  password: "admin123", // Hash ini di production
};

export interface AdminUser {
  email: string;
  role: "admin";
}

export async function validateAdmin(email: string, password: string): Promise<boolean> {
  if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
    return true;
  }
  return false;
}

export function generateToken(user: AdminUser): string {
  return jwt.sign(user, JWT_SECRET, { expiresIn: "24h" });
}

export function verifyToken(token: string): AdminUser | null {
  try {
    return jwt.verify(token, JWT_SECRET) as AdminUser;
  } catch {
    return null;
  }
}

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}
