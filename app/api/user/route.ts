import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connect } from "@/dbconfig";
import userModel from "@/models/User";


export async function GET(request: Request) {
  try {
    await connect();
    const users = await userModel.find({});
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

