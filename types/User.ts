import { Types } from "mongoose";

export type User= {
  name: string;
  email: string;
  phoneNumber:number;
  password: string;
  imageUrl: string;
  role: "SuperAdmin" | "HeadAdmin" | "Admin";
  institution: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  points: number; 
  reputation: number;
  streak : number;
}