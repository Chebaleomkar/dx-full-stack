import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbconfig";
import userModel from "@/models/User";
import { isValidObjectId } from "mongoose";
import { composeMiddleware } from "@/utils/middlewares/composeMiddleware";
import { roleMiddleware } from "@/utils/middlewares/rolemiddleware";
connect();

const getUserByIdHandler = async(req: NextRequest,{ params }: { params: { id: string } })=>{
  try {
    const { id } = await params;
    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );
    }
    const user = await userModel.findById(id).select("-password");
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json(user, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

const applyMiddlewareUserHandler = composeMiddleware([roleMiddleware(['HeadAdmin' , "Admin"])])
export async function GET(req: NextRequest,{ params }: { params: { id: string } }) {
  const middlewareResponse = await applyMiddlewareUserHandler(req)
  if(middlewareResponse) return middlewareResponse
  return getUserByIdHandler(req , {params});
}