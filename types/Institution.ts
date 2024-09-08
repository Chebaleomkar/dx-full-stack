import { Types } from "mongoose";

export type Institution = {
  name: string;
  address?: string;
  headAdmins: Types.ObjectId[];
  admins: Types.ObjectId[];
  institutionId: string;
  website : string;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  plan : "Basic" | "Standard" | "premium"
  studentsCount : number;
}