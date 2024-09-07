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

    // Calculate the date 7 days ago from today
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    // Fetch fines issued in the last 7 days
    const recentFines = await fineModel.aggregate([
      {
        // Match fines issued within the last 7 days
        $match: {
          issuedAt: { $gte: sevenDaysAgo },
        },
      },
      {
        // Lookup the issuedBy user information from the User collection
        $lookup: {
          from: "users", // The users collection
          localField: "issuedBy", // issuedBy field in fines
          foreignField: "_id", // _id field in users
          as: "user", // Result as user
        },
      },
      {
        // Unwind the user array (since lookup returns an array)
        $unwind: "$user",
      },
      {
        // Match the user's institution with the provided institutionId
        $match: {
          "user.institution": new mongoose.Types.ObjectId(institutionId),
        },
      },
      {
        // Optionally, remove the user details if not needed in the output
        $project: {
          user: 0,
        },
      },
    ]);

    return NextResponse.json(recentFines, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
