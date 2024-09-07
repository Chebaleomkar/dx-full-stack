import mongoose, { Schema, model, Document, Types } from "mongoose";

interface Institution {
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

const institutionSchema = new Schema<Institution>({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  institutionId: {
    type: String,
    unique: true,
    required: true,
  },
  website: {
    type: String,
    unique: true,
  },
  imageUrl: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  plan: {
    type: String,
    enum: ["Basic" , "Standard" , "premium"],
    default: "Basic",
  },
  studentsCount : {
    type : Number,
    default : 0
  }
});

const institutionModel =mongoose.models.Institution || model<Institution>("Institution", institutionSchema);

export default institutionModel;
