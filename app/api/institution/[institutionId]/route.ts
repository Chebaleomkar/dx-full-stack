import { NextResponse } from "next/server";
import { isValidObjectId } from "mongoose";
import institutionModel from "@/models/Institution";
import { connect } from "@/dbconfig";

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

    const institution = await institutionModel.findById(institutionId);

    if (!institution) {
      return NextResponse.json(
        { message: "Institution not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(institution, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(
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

    const updateInstitutionData = await req.json();

    if (
      !updateInstitutionData ||
      Object.keys(updateInstitutionData).length === 0
    ) {
      return NextResponse.json(
        { message: "No update data provided" },
        { status: 400 }
      );
    }

    const updateInstitution = await institutionModel.findByIdAndUpdate(
      institutionId,
      updateInstitutionData,
      { new: true }
    );

    if (!updateInstitution) {
      return NextResponse.json(
        { message: "Institution not updated" },
        { status: 500 }
      );
    }

    return NextResponse.json(updateInstitution, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
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

    const deletedInstitution = await institutionModel.findByIdAndDelete(
      institutionId
    );

    if (!deletedInstitution) {
      return NextResponse.json(
        { message: "Institution not deleted" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: "Institution Deleted Successfully",
        institutionId: deletedInstitution._id,
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
