import { isValidObjectId } from "mongoose";
import studentModel from "@/models/Student";
import { NextResponse } from "next/server";
import { connect } from "@/dbconfig";

connect();

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { message: "Student ID is required" },
        { status: 400 }
      );
    }

    const student = await studentModel.findById(id).select("-password");

    if (!student) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(student, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }){
 try {
    const { id } = params;

    if (!isValidObjectId(id)) {
    return NextResponse.json(
        { message: "Student ID is required" },
        { status: 400 }
    )};

    const studentData = await req.json();
    if(!studentData){
        return NextResponse.json({message : "No data to update"},{status:500});
    }

    const updateStudent = await studentModel.findByIdAndUpdate(id , studentData , {new:true});

    if(!updateStudent){
        return NextResponse.json({message :"Student not updated"},{status:500});
    }

    return NextResponse.json(updateStudent ,{status:200});
 } catch (error:any) {
    return NextResponse.json(
    { message: error.message || "Internal Server Error" },
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
        { message: "Student ID is required" },
        { status: 400 }
      );
    }

    const deleteStudent = await studentModel.findByIdAndDelete(id);

    if (!deleteStudent) {
      return NextResponse.json(
        { message: "Student not deleted" },
        { status: 500 }
      );
    }

    return NextResponse.json({message : "Student deleted Successfully" , studentId : deleteStudent.studentId}, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
