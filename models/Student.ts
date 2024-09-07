import mongoose, { Schema, models, Document, Types , model } from "mongoose";

// Define the TypeScript interface for the student
interface Student {
  name: string;
  studentId: string;
  dateOfBirth: Date;
  imageUrl?: string;
  totalFine: number;
  recentFineAmount: number;
  updatedAt: Date;
  updatedBy: Types.ObjectId;
  mobileNumber?: string;
  email?: string;
  gender?: string;
  course?: string;
  age?: number;
  finedDayTime: Date[];
  institution: Types.ObjectId;
  verificationCode?: string;
  verificationCodeExpires?: Date;
  passwordSet: boolean;
  reputation: number; // Add this field
  lastLoginDate?: Date; // Track the last login date for streak calculation
  streak: number; // Track the current streak
  loginDays: string[]; // Track days student logged in (YYYY-MM-DD format)
}

// Create the schema using the interface
const studentSchema = new Schema<Student>({
  name: {
    type: String,
    required: true,
  },
  studentId: {
    type: String,
    required: true,
    unique: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  totalFine: {
    type: Number,
    default: 0,
  },
  recentFineAmount: {
    type: Number,
    default: 0,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  updatedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  mobileNumber: {
    type: String,
  },
  email: {
    type: String,
  },
  gender: {
    type: String,
  },
  course: {
    type: String,
  },
  age: {
    type: Number,
  },
  finedDayTime: [
    {
      type: Date,
    },
  ],
  institution: {
    type: Schema.Types.ObjectId,
    ref: "Institution",
  },
  verificationCode: {
    type: String,
  },
  verificationCodeExpires: {
    type: Date,
  },
  passwordSet: {
    type: Boolean,
    default: false,
  },
  reputation: { type: Number, default: 0 , max:[100 , 'You have max reputation'] },
  lastLoginDate: { type: Date },
  streak: { type: Number, default: 0 },
  loginDays: { type: [String], default: [] },
});

const studentModel =mongoose.models.Student || model<Student>("Student", studentSchema);

export default studentModel;
