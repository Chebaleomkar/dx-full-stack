import jwt from "jsonwebtoken";
import { Types } from "mongoose";

export const generateToken = (id: Types.ObjectId, role: string): string => {
  const secret_key = process.env.NEXT_PUBLIC_SECRET_KEY!;
  if (!secret_key) {
    throw new Error("SECRET_KEY is not defined in environment variables.");
  }

  // Generate the JWT token
  return jwt.sign({ id: id.toString(), role: role }, secret_key, {
    expiresIn: "12h",
  });
};
