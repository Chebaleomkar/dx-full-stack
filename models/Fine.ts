// fineSchema.js
import { Schema, model, Types , Models } from "mongoose";
import mongoose  from 'mongoose';

interface Fine {
  student: Types.ObjectId;
  amount: number;
  reason: string;
  issuedBy: Types.ObjectId;
  issuedAt: Date;
  paidAt : Date; // new field
  status: "processing" | "updated" | "confirmed" | "unpaid" | "paid";
}

const fineSchema = new Schema<Fine>({
  student: {
    type: Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  issuedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  issuedAt: {
    type: Date,
    default: Date.now,
  },
  paidAt : {
    type : Date,
    required : false
  },
  status: {
    type: String,
    enum: ["processing" , "updated" ,"confirmed" , "unpaid" , "paid"],
    default: "processing",
  },
});


const fineModel = mongoose.models.Fine || model<Fine>("Fine", fineSchema);


export default fineModel;
