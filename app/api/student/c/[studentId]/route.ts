import { connect } from "@/dbconfig";
import studentModel from "@/models/Student";
import { composeMiddleware } from "@/utils/middlewares/composeMiddleware";
import { roleMiddleware } from "@/utils/middlewares/rolemiddleware";
import { NextRequest, NextResponse } from "next/server";
connect();
// ID : eg.2200050
const getByStudentID = async(req: NextRequest,{ params }: { params: { studentId: string } }) =>{
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

const applyMiddlewareGetStudentID = composeMiddleware([roleMiddleware(["Admin" , "HeadAdmin"])])
export async function GET(req: NextRequest,{ params }: { params: { studentId: string } }) {
  const middlewareResponse = await applyMiddlewareGetStudentID(req)
  if(middlewareResponse) return middlewareResponse
  return getByStudentID(req , {params});
}