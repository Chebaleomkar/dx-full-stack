
import { DUMMY_STUDENT_ID } from "@/constant";
import { connect } from "@/dbconfig";
import fineModel from "@/models/Fine";
import userModel from "@/models/User";
import { isValidObjectId } from "mongoose";
import { NextRequest, NextResponse } from "next/server";
connect();

export async function GET(
  req: NextRequest,
  { params }: { params: { studentId: string } }
) {
  try {
    const { studentId } = params;
    if (!isValidObjectId(studentId)) {
      return NextResponse.json(
        { message: "Fine ID is required" },
        { status: 400 }
      );
    }
    const DummyStudent = await userModel.findById(DUMMY_STUDENT_ID);
    const studentFines = await fineModel.find({ student: studentId }).populate("issuedBy", "name email");
    if (!studentFines.length) {
      return NextResponse.json(
        { message: `No found for student id : ${studentId} ` },
        { status: 200 }
      );
    }
    return NextResponse.json(studentFines, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
