import { connect } from "@/dbconfig";
import fineModel from "@/models/Fine";
import { Fine } from "@/types/Fine";  
import { composeMiddleware } from "@/utils/middlewares/composeMiddleware";
import { roleMiddleware } from "@/utils/middlewares/rolemiddleware";
import { isValidObjectId } from "mongoose";
import { NextRequest, NextResponse } from "next/server";
connect();  
interface FineUpdateRequest {
  amount?: number;
  reason?: string;
}

const getFineById = async(  req: NextRequest,  { params }: { params: { id: string } })=> {
  try {
    const { id } = params;
    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { message: "Fine ID is required" },
        { status: 400 }
      );
    }
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

const updateFineById =async (req: NextRequest,{ params }: { params: { id: string } })=> {
  try {
    const { id } = params;
    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { message: "Student ID is required" },
        { status: 400 }
      );
    }
    const fineData: FineUpdateRequest = await req.json();
    const fine: Fine | null = await fineModel.findById(id).lean();
    if (!fine) {
      return NextResponse.json(
        { message: "Fine not found" },
        { status: 404 }
      );
    }
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

    if (fine.status === "updated") {
      return NextResponse.json(
        { message: "You can update the fine only once" },
        { status: 400 }
      );
    }

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


const applyGetFineMiddleware = composeMiddleware([roleMiddleware(['Student' , "Admin" , "HeadAdmin"])]);

export async function GET( req: NextRequest,  { params }: { params: { id: string } }){
  const middlewareResponse = await applyGetFineMiddleware(req)
  if(middlewareResponse) return middlewareResponse
  return getFineById(req,{params});
}

const applyMiddlewareToUpdateFine = composeMiddleware([roleMiddleware(["Admin" , "HeadAdmin"])]);

export async function PUT(req: NextRequest,{ params }: { params: { id: string } }) {
  const middlewareResponse = await applyMiddlewareToUpdateFine(req)
  if(middlewareResponse) return middlewareResponse
  return updateFineById(req,{params});
}