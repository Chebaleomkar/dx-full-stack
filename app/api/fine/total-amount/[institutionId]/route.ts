import { connect } from "@/dbconfig";
import fineModel from "@/models/Fine";
import mongoose, { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";

connect();

export async function GET(
  req: Request,
  { params }: { params: { institutionId: string } }
) {
  try {
    const { institutionId } = params;

    if (!isValidObjectId(institutionId)) {
      return NextResponse.json(
        { message: "Institution ID is required" },
        { status: 400 }
      );
    }
    const totalAmount = await fineModel.aggregate([
      // Lookup to join student data
      {
        $lookup: {
          from: "students", // Collection name of students
          localField: "student",
          foreignField: "_id",
          as: "studentData",
        },
      },
      // Unwind to deconstruct the array from the lookup
      { $unwind: "$studentData" },
      // Match the institution ID
      {
        $match: {
          "studentData.institution": new mongoose.Types.ObjectId(institutionId),
        },
      },
      // Group and sum the amounts
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" },
        },
      },
    ]);

    return NextResponse.json(totalAmount[0] || { totalAmount: 0 }, {
      status: 200,
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: error?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
