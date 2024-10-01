import { isValidObjectId } from "mongoose";
import studentModel from "@/models/Student";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbconfig";
import { composeMiddleware } from "@/utils/middlewares/composeMiddleware";
import { roleMiddleware } from "@/utils/middlewares/rolemiddleware";
connect();

const getStudentByIdHandler = async(req: NextRequest,{ params }: { params: { id: string } })=> {
  try {
    const { id } = params;
    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { message: "Student ID is required" },
        { status: 400 }
      );
    }
    const student = await studentModel.findById(id).select("-password");
    if (!student) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json(student, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}


const applyMiddlewareGetStudentHandler = composeMiddleware([roleMiddleware(["Student" , "Admin" , "HeadAdmin"])]);

export async function GET(req: NextRequest,{ params }: { params: { id: string } }) {
  const middlewareResponse = await applyMiddlewareGetStudentHandler(req)
  if(middlewareResponse) return middlewareResponse
  return getStudentByIdHandler(req , {params});
}