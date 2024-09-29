import { connect } from "@/dbconfig";
import fineModel from "@/models/Fine";
import mongoose, { isValidObjectId } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(
  req: NextRequest,
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
    // Perform a single aggregation for both totalAmount and totalPaidAmount
    const result = await fineModel.aggregate([
      {
        $lookup: {
          from: "students",
          localField: "student",
          foreignField: "_id",
          as: "studentData",
        },
      },
      { $unwind: "$studentData" },
      {
        $match: {
          "studentData.institution": new mongoose.Types.ObjectId(institutionId),
        },
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" }, // Total amount of all fines
          totalPaidAmount: {
            $sum: {
              $cond: [{ $eq: ["$status", "paid"] }, "$amount", 0],
            },
          }, // Only sum fines where status is 'paid'
        },
      },
    ]);
    const totalAmount = result[0]?.totalAmount || 0;
    const totalPaidAmount = result[0]?.totalPaidAmount || 0;
    // Return both totalAmount and totalPaidAmount in a single response
    return NextResponse.json(
      {
        totalAmount,
        totalPaidAmount,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: error?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
