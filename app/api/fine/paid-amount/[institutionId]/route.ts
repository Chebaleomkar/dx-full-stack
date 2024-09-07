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

    const totalPaidAmount = await fineModel.aggregate([
      {
        $lookup: {
          from: "students", // Collection name of students
          localField: "student",
          foreignField: "_id",
          as: "studentData",
        },
      },
      { $unwind: "$studentData" },
      {
        $match: {
          "studentData.institution": new mongoose.Types.ObjectId(institutionId),
          status: "paid",
        },
      },
      { $group: { _id: null, totalAmount: { $sum: "$amount" } } },
    ]);


    return NextResponse.json(totalPaidAmount[0] || { totalAmount: 0 }, {
      status: 200,
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: error?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
