import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbconfig";
import userModel from "@/models/User";
import { roleMiddleware } from "@/utils/rolemiddleware";

connect();

export async function GET(req: NextRequest) {
  try {
    const roleCheck = await roleMiddleware(['SuperAdmin'])(req);
    if (roleCheck.status === 403) {
      return roleCheck;
    }
    const users = await userModel.find();
    if(!users){
      return NextResponse.json(
        { error: "users not found" },
        { status: 500 }
      );
    }
    return NextResponse.json(users);
  } catch (error:any) {
    return NextResponse.json(
      { message: error?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

