import { Types } from "mongoose";

export type FineItem = {
  id? : string;
  label: string;
  value: string;
  _id? :string;
}

export type Institution = {
  _id : string;
  name: string;
  address?: string;
  institutionId: string;
  website : string;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  plan : "Basic" | "Standard" | "premium"
  studentsCount : number;
  fineItems : FineItem[];
  studentCount : number;
  userCount : number;
}