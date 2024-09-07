import mongoose, { Schema, model,  Types } from "mongoose";

// Define the TypeScript interface for the user
interface User {
  name: string;
  email: string;
  phoneNumber:number;
  password: string;
  imageUrl: string;
  role: "SuperAdmin" | "HeadAdmin" | "Admin";
  institution: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  points: number; // New field
  reputation: number;
}

// Create the schema using the interface
const userSchema = new Schema<User>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber:{
    type : Number,
    min : [10 , 'Phone Number must be 10 digits'],
    max : [10 , 'Phone Number must not be greater than 10 digits'],
  },
  imageUrl: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["SuperAdmin", "HeadAdmin", "Admin"],
    default: "Admin",
  },
  institution: {
    type: Schema.Types.ObjectId,
    ref: "Institution",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  points: { type: Number, default: 0 }, // New field
  reputation: { type: Number, default: 0 },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});
const userModel = mongoose.models.User || model<User>("User", userSchema);

export default userModel;
