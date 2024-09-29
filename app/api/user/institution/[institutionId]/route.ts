import { connect } from "@/dbconfig";
import userModel from "@/models/User";
import { isValidObjectId } from "mongoose";
import { NextRequest, NextResponse } from "next/server";
connect();

export async function GET(req: NextRequest, { params }: { params: { institutionId: string } }){
  try {
    const {institutionId} = params;
    if(!isValidObjectId(institutionId)){
    return NextResponse.json(
        { message: "Institution ID is required" },
        { status: 400 }
        );
    }
    const AdminOInstitution = await userModel.find({institution : institutionId});
    if(!AdminOInstitution){
    return NextResponse.json(
        { message: "Institution Users not found" },
        { status: 400 }
        );
    }
    return NextResponse.json(AdminOInstitution , {status:200})
  } catch (error:any) {
  return NextResponse.json(
    { message: error?.message || "Internal Server Error" },
    { status: 500 });
  }
}