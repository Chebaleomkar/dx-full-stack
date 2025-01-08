import { connect } from "@/dbconfig";
import fineModel from "@/models/Fine";
import { composeMiddleware } from "@/utils/middlewares/composeMiddleware";
import { roleMiddleware } from "@/utils/middlewares/rolemiddleware";
import mongoose, { isValidObjectId } from "mongoose";
import { NextRequest, NextResponse } from "next/server";
connect();

const getTodayFineHandler = async(req: NextRequest,{ params }: { params: { institutionId: string } })=> {
  try {
    const { institutionId } = await params;
    if (!isValidObjectId(institutionId)) {
      return NextResponse.json(
        { message: "Institution ID is required" },
        { status: 400 }
      );
    }
    const startOfDay = new Date();startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();endOfDay.setHours(23, 59, 59, 999);
    const todayFines = await fineModel.aggregate([
      {
        $match: {
          issuedAt: { $gte: startOfDay, $lte: endOfDay },
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
    return NextResponse.json({ todayFines }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error?.message || "Internal Server Error" },
      { status: 500 }
    );
}
}

const applyMiddlewareTodayFine = composeMiddleware([roleMiddleware(["HeadAdmin"])])

export async function GET(req: NextRequest,{ params }: { params: { institutionId: string } }) {
  const middlewareResponse = await applyMiddlewareTodayFine(req)
  if(middlewareResponse) return middlewareResponse
  return getTodayFineHandler(req , {params});
}