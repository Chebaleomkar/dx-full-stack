import { DUMMY_STUDENT_ID } from "@/constant";
import { connect } from "@/dbconfig";
import fineModel from "@/models/Fine";
import studentModel from "@/models/Student";
import { composeMiddleware } from "@/utils/middlewares/composeMiddleware";
import { roleMiddleware } from "@/utils/middlewares/rolemiddleware";
import { isValidObjectId } from "mongoose";
import { NextRequest, NextResponse } from "next/server";
connect();

const getFineHandler = async (req: NextRequest, { params }: { params: { userId: string } }) => {
  try {
    const { userId } = await params;

    if (!isValidObjectId(userId)) {
      return NextResponse.json({ message: "Invalid User ID" }, { status: 400 });
    }
    const DummyStudent = await studentModel.findById(DUMMY_STUDENT_ID);
    const fines = await fineModel
      .find({ issuedBy: userId })
      .populate("student", "name studentId");

    if (!fines.length) {
      return NextResponse.json({ message: "No fines found for this user" }, { status: 404 });
    }

    return NextResponse.json(fines, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error?.message || "Internal Server Error" }, { status: 500 });
  }
};

const allMiddleware = composeMiddleware([roleMiddleware(['Student', "Admin" , "HeadAdmin"])]);

export async function GET(req: NextRequest, params: { params: { userId: string } }) {
  const middlewareResponse = await allMiddleware(req);
  if (middlewareResponse) return middlewareResponse;

  return getFineHandler(req, params);
}
