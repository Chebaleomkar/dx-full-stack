import jwt from "jsonwebtoken";
import { Types } from "mongoose";

export const generateToken = (id: Types.ObjectId, role: string) => {
  return jwt.sign({ id: id, role: role }, `dxAlpha@omkar!Sudhir`, {
    expiresIn: "10h",
  });
};
