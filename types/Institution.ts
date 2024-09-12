import { Types } from "mongoose";

type FineItem = {
  id : string;
  label: string;
  value: string;
}

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
  fineItems : FineItem[];
}