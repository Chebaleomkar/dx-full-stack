import { connect } from "@/dbconfig";
import studentModel from "@/models/Student";
import { isValidObjectId } from "mongoose";
import { NextRequest, NextResponse } from "next/server";
connect();

export async function GET(
  req: NextRequest,
  { params }: { params: { institutionId: string } }
) {
  try {
    const { institutionId } = params;
    if (!isValidObjectId(institutionId)) {
      return NextResponse.json(
        { message: "Institution ID is required" },
        { status: 400 }
      );
    }
    const studentsOfInstitution = await studentModel.find({institution :institutionId});
    if(!studentsOfInstitution){
        return NextResponse.json({message : `No Students found in ${institutionId}`} , {status:200});
    }
    return NextResponse.json(studentsOfInstitution, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
