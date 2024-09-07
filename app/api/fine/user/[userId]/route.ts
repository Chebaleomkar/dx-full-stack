
import { DUMMY_STUDENT_ID } from "@/constant";
import { connect } from "@/dbconfig";
import fineModel from "@/models/Fine";
import studentModel from "@/models/Student";
import userModel from "@/models/User";
import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";

connect();

export async function GET(req:Request , {params}:{params:{userId:string}}){
  try {
    const { userId } = params;

    if (!isValidObjectId(userId)) {
      return NextResponse.json(
        { message: "Fine ID is required" },
        { status: 400 }
      );
    }
    // overcome the error : Schema hasn't been registered for model \"Student\"
    const DummyStudent = await studentModel.findById(`66a923aed671d71cd08f5322`);
    const fines = await fineModel
      .find({ issuedBy: userId })
      .populate("student", "name studentId");

    if (!fines.length) {
      return NextResponse.json(
        { message: "No fines found for this user" },
        { status: 404 }
      );
    }

    return NextResponse.json(fines, { status: 200 });
  } catch (error:any) {
    return NextResponse.json(
      { message: error?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}