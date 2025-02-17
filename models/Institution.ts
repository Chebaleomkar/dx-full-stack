import mongoose, { Schema, model, Document, Types } from "mongoose";

interface FineItem {
  id : string;
  label: string;
  value: string;
}

interface Institution {
  name: string;
  address?: string;
  institutionId: string;
  website: string;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  plan: "Basic" | "Standard" | "premium";
  studentsCount: number;
  userCount : number;
  fineItems: FineItem[]
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
  },
  userCount : {
    type : Number,
    default : 0
  },
  fineItems:[
    {
      id : {
        type : String,
        required: true,
      },
      label: {
        type: String,
        required: true
      },
      value: {
        type: String,
        required: true,
      }
    }
  ],
});

const institutionModel =mongoose.models.Institution || model<Institution>("Institution", institutionSchema);

export default institutionModel;
