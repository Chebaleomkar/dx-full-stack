import { connect } from "@/dbconfig";
import fineModel from "@/models/Fine";
import { Fine } from "@/types/Fine";  
import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";

connect();  // Ensure the database is connected

interface FineUpdateRequest {
  amount?: number;
  reason?: string;
}

// GET method to retrieve a fine by ID
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { message: "Fine ID is required" },
        { status: 400 }
      );
    }

    // Retrieve the fine from the database
    const fine: Fine | null = await fineModel.findById(id).lean();

    if (!fine) {
      return NextResponse.json(
        { message: "Fine not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(fine, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

// PUT method to update a fine by ID
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { message: "Student ID is required" },
        { status: 400 }
      );
    }

    const fineData: FineUpdateRequest = await req.json();

    // Fetch the fine from the database
    const fine: Fine | null = await fineModel.findById(id).lean();

    if (!fine) {
      return NextResponse.json(
        { message: "Fine not found" },
        { status: 404 }
      );
    }

    // Check if 48 hours have passed since the fine was issued
    const now = new Date();
    const issuedAtTime = new Date(fine.issuedAt);
    const timeDifferenceInHours =
      (now.getTime() - issuedAtTime.getTime()) / (1000 * 60 * 60);

    if (timeDifferenceInHours > 48) {
      return NextResponse.json(
        {
          message: "You can only update the fine within 48 hours of its creation.",
        },
        { status: 400 }
      );
    }

    // Ensure the fine hasn't already been updated
    if (fine.status === "updated") {
      return NextResponse.json(
        { message: "You can update the fine only once" },
        { status: 400 }
      );
    }

    // Check if the amount is valid (cannot increase or be reduced by more than 10)
    if (fineData?.amount !== undefined) {
      if (fineData.amount > fine.amount) {
        return NextResponse.json(
          { message: "Amount cannot be increased" },
          { status: 400 }
        );
      }

      if (fineData.amount < fine.amount - 10) {
        return NextResponse.json(
          { message: "Amount can only be reduced by up to 10." },
          { status: 400 }
        );
      }
    }

    // Update the fine and mark it as updated
    const updatedFine  = await fineModel.findByIdAndUpdate(
      id,
      { ...fineData, status: "updated" },
      { new: true, lean: true }
    );

    if (!updatedFine) {
      return NextResponse.json(
        { message: "Error updating fine." },
        { status: 500 }
      );
    }

    return NextResponse.json(updatedFine, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
