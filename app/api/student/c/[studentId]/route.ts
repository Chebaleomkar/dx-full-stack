import { connect } from "@/dbconfig";
import studentModel from "@/models/Student";
import { NextResponse } from "next/server";

connect();

export async function GET(
  req: Request,
  { params }: { params: { studentId: string } }
) {
  try {
    const { studentId } = params;

    if (!studentId) {
      return NextResponse.json(
        { message: "Student ID is required" },
        { status: 400 }
      );
    }

    const student = await studentModel.findOne({studentId : studentId});

    if(!student){
        return NextResponse.json({message : `student not found`} , {status:500});
    }

    return NextResponse.json(student, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
