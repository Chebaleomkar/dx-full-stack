
import { DUMMY_STUDENT_ID } from "@/constant";
import { connect } from "@/dbconfig";
import fineModel from "@/models/Fine";
import userModel from "@/models/User";
import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";

connect();

export async function GET(
  req: Request,
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
    // overcome the error : Schema hasn't been registered for model \"User\".\nUse mongoose.model(name, schema)
    const DummyStudent = await userModel.findById(`66a923aed671d71cd08f5322`);
    
    const studentFines = await fineModel
      .find({ student: studentId })
      .populate("issuedBy", "name email");

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
