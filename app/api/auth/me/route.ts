import { connect } from "@/dbconfig";
import studentModel from "@/models/Student";
import userModel from "@/models/User";
import { getDataFromToken } from "@/utils/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
connect();
export async function GET(req: NextRequest) {
  try {
    const { _id, role } = await getDataFromToken(req);
    let user;
    if (role === 'Student') {
      user = await studentModel.findById(_id); 
    } else {
      user = await userModel.findById(_id); 
    }
    return NextResponse.json({ user });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
