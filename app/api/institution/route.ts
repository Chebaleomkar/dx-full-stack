import { NextResponse } from "next/server";
import { connect } from "@/dbconfig";
import institutionModel from "@/models/Institution";


export async function GET(request: Request) {
  try {
    await connect();
    const institutions = await institutionModel.find();
    if (!institutions) {
      return NextResponse.json({ error: "users not found" }, { status: 500 });
    }
    return NextResponse.json(institutions);
  } catch (error:any) {
    return NextResponse.json(
      { message: error?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await connect();
    const reqBody = await req.json();

    const { name, address, institutionId, imageUrl, website}  = reqBody;
    if (!name) {
      return NextResponse.json(
        { error: "institution Name  are required" },
        { status: 400 }
      );
    }
    if (!address) {
      return NextResponse.json(
        { error: "institution address  are required" },
        { status: 400 }
      );
    }
    if (!institutionId) {
      return NextResponse.json(
        { error: "institution ID  are required" },
        { status: 400 }
      );
    }
    if (!imageUrl) {
      return NextResponse.json(
        { error: "institution image  are required" },
        { status: 400 }
      );
    }
    if (!website) {
      return NextResponse.json(
        { error: "institution website must be unique and required" },
        { status: 400 }
      );
    }
    

    const existingInstitution = await institutionModel.findOne({institutionId : institutionId});

    if(existingInstitution){
      return NextResponse.json({
        message : "Institution already exists",
      } , {status : 400})
    }

    const newInstitution = new institutionModel({name , institutionId , imageUrl , website });
    await newInstitution.save();

    return NextResponse.json(newInstitution, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create Institution" },
      { status: 500 }
    );
  }
}
