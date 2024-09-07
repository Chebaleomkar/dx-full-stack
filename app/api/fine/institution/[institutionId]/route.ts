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
            { message: "Invalid Institution ID" },
            { status: 400 }
        );
        }

    const institutionObjectId = new mongoose.Types.ObjectId(institutionId);

    // Aggregate total fines
    const totalFinesResult = await fineModel.aggregate([
      { $match: { institution: institutionObjectId } },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" },
          count: { $sum: 1 },
        },
      },
    ]);

    const totalFines =
      totalFinesResult.length > 0
        ? totalFinesResult[0]
        : { totalAmount: 0, count: 0 };

    // Aggregate fines by type
    const finesByType = await fineModel.aggregate([
      { $match: { institution: institutionObjectId } },
      {
        $group: {
          _id: "$reason",
          totalAmount: { $sum: "$amount" },
          count: { $sum: 1 },
        },
      },
    ]);

    return NextResponse.json(
      {
        totalFines,
        finesByType,
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
