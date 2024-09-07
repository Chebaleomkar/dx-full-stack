import { connect } from "@/dbconfig";
import fineModel from "@/models/Fine";
import { NextResponse } from "next/server";

connect();
export async function GET(req: Request) {
  try {
    const fines = await fineModel.find();
    if (!fines) {
      return NextResponse.json({ message: "No fines found" }, { status: 500 });
    }
    return NextResponse.json(fines, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
