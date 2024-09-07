import { NextResponse } from "next/server";
import { connect } from "@/dbconfig";
import userModel from "@/models/User";
import { isValidObjectId } from "mongoose";

connect();

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

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

export async function PUT(req:Request , {params}:{params:{id:string}}){
  try {
    const { id } = params;
    const updateData = await req.json();

    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );
    }
    
    const updateUser = await userModel.findByIdAndUpdate(id , updateData , {new :true}).select("-password");

    if(!updateUser){
      return NextResponse.json({message : "user not found"} , {status:200});
    }

    return NextResponse.json(updateUser , {status:200});
  } catch(error:any) {
    return NextResponse.json(
      { message: error?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );
    }

    const deleteUser = await userModel.findByIdAndDelete(id).select("-password");

    if (!deleteUser) {
      return NextResponse.json({ message: "user not found" }, { status: 200 });
    }

    return NextResponse.json({message : "user deleted Successfully" , email : deleteUser?.email }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
