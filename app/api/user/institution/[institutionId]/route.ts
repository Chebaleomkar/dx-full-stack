import { connect } from "@/dbconfig";
import userModel from "@/models/User";
import { composeMiddleware } from "@/utils/middlewares/composeMiddleware";
import { roleMiddleware } from "@/utils/middlewares/rolemiddleware";
import { isValidObjectId } from "mongoose";
import { NextRequest, NextResponse } from "next/server";
connect();

const getAllUserByInstitution = async(req: NextRequest, { params }: { params: { institutionId: string } })=>{
  try {
    const {institutionId} = await params;
    if(!isValidObjectId(institutionId)){
    return NextResponse.json(
        { message: "Institution ID is required" },
        { status: 400 }
        );
    }
    const institutionAdmins = await userModel.find({institution : institutionId}).select("-password");
    if(!institutionAdmins){
    return NextResponse.json(
        { message: "Institution Users not found" },
        { status: 400 }
        );
    }
    return NextResponse.json(institutionAdmins , {status:200})
  } catch (error:any) {
  return NextResponse.json(
    { message: error?.message || "Internal Server Error" },
    { status: 500 });
  }
}

const applyMiddlewareUserByInstitutionHandler = composeMiddleware([roleMiddleware(['HeadAdmin'])]);

export async function GET(req: NextRequest, { params }: { params: { institutionId: string } }){
  const middlewareResponse = await applyMiddlewareUserByInstitutionHandler(req)
  if(middlewareResponse) return middlewareResponse
  return getAllUserByInstitution(req , {params});
}