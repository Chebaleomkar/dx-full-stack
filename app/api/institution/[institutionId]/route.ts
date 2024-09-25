import { NextRequest, NextResponse } from "next/server";
import { isValidObjectId } from "mongoose";
import institutionModel from "@/models/Institution";
import { connect } from "@/dbconfig";

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

    const institution = await institutionModel.findById(institutionId);

    if (!institution) {
      return NextResponse.json(
        { message: "Institution not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(institution, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}


