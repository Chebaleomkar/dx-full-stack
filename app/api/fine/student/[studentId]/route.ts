import { DUMMY_STUDENT_ID } from "@/constant";
import { connect } from "@/dbconfig";
import fineModel from "@/models/Fine";
import userModel from "@/models/User";
import { composeMiddleware } from "@/utils/middlewares/composeMiddleware";
import { roleMiddleware } from "@/utils/middlewares/rolemiddleware";
import { isValidObjectId } from "mongoose";
import { NextRequest, NextResponse } from "next/server";
connect();

const getFineByStudentIdHandler = async(req: NextRequest,{ params }: { params: { studentId: string } }) =>{
  try {
    const { studentId } = await params;
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

    const transformedFines = studentFines.map(fine => ({
      _id: fine._id,
      student: fine.student,
      amount: fine.amount,
      reason: fine.reason,
      issuedBy: fine.issuedBy.name, 
      issuedAt: fine.issuedAt,
      status: fine.status
    }));
    return NextResponse.json(transformedFines, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

const applyMiddlewareStudentFineHandler = composeMiddleware([roleMiddleware(["Student"])]);

export async function GET(req: NextRequest,{ params }: { params: { studentId: string } }){
  const middlewareResponse = await applyMiddlewareStudentFineHandler(req)
  if(middlewareResponse) return middlewareResponse
  return getFineByStudentIdHandler(req , {params});
}