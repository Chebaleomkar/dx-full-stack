import studentModel from "@/models/Student";
import { NextResponse } from "next/server";
import { isValidObjectId } from 'mongoose';
import { connect } from "@/dbconfig";

connect();

export async function GET(req: Request) {
  try {
    const students = await studentModel.find();
    if (!students) {
      return NextResponse.json(
        { message: "Students not found" },
        { status: 500 }
      );
    }
    return NextResponse.json(students);
  } catch (error: any) {
    return NextResponse.json(
      { message: error?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req:Request){
 try {
    const reqBody = await req.json();
    const {name , studentId , dateOfBirth, imageUrl , mobileNumber , email , gender , course , age , institution } = reqBody;
    if(!name){
        return NextResponse.json({message : "Student Name is required"} , {status:500});
    }
    if(!studentId){
        return NextResponse.json({message : "Student Id is required"} , {status:500});
    }
    if(!dateOfBirth){
        return NextResponse.json({message : "Student DOB is required"} , {status:500});
    }
    if(!imageUrl){
        return NextResponse.json({message : "Student image Url is required"} , {status:500});
    }
    if(!mobileNumber){
        return NextResponse.json({message : "Student Mobile Number is required"} , {status:500});
    }
    if(!email){
        return NextResponse.json({message : "Student email is required"} , {status:500});
    }
    if(!gender){
        return NextResponse.json({message : "Student gender is required"} , {status:500});
    }
    if(!course){
        return NextResponse.json({message : "Student course is required"} , {status:500});
    }
    if(!age){
        return NextResponse.json({message : "Student gender is required"} , {status:500});
    }
    if(!isValidObjectId(institution)){
        return NextResponse.json({message : "Student institution Id is required"} , {status:500});
    }

  const isStudentExist = await studentModel.exists({$or: [{ email }, { studentId }],});

    if(isStudentExist){
        return NextResponse.json({message : "Student Already Exist"} , {status:500});
    }

    const newStudent = new studentModel({name ,studentId , dateOfBirth , imageUrl , mobileNumber , email , gender , course , age , institution });
    await newStudent.save();
    return NextResponse.json({message : "Student inserted Successfully" , newStudent} , {status:201});

 } catch (error:any) {
    return NextResponse.json(
    { message: error.message || "Internal Server Error" },
    { status: 500 }
    ); 
 }
}

