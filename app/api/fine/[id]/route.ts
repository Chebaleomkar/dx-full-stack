import { connect } from "@/dbconfig";
import fineModel from "@/models/Fine";
import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";

connect();
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

    const fine = await fineModel.findById(id);

    if(!fine){
        return NextResponse.json({message : "Fine not found"},{status:500} );
    }

    return NextResponse.json(fine , {status:200});
 } catch (error:any) {
    return NextResponse.json(
      { message: error?.message || "Internal Server Error" },
      { status: 500 }
    );
 }
}

//ERROR : Type error: Property 'issuedAt' does not exist on type '(FlattenMaps<any> & Required<{ _id: unknown; }>)[] | (FlattenMaps<any> & Required<{ _id: unknown; }>)'.
// Property 'issuedAt' does not exist on type '(FlattenMaps<any> & Required<{ _id: unknown; }>)[]'.
// export async function PUT(
//   req: Request,
//   { params }: { params: { id: string } }
// ) {
//  try {
//     const { id } = params;

//     if (!isValidObjectId(id)) {
//       return NextResponse.json(
//         { message: "Student ID is required" },
//         { status: 400 }
//       );
//     }
//     const fineData = await req.json();
//     const fine = await fineModel.findById(id).lean();

//     if (!fine) {
//       return NextResponse.json({ message: "Fine not found" }, {status:404});
//     }

//     // Check all conditions in a sequence to avoid unnecessary database updates
//     const now = new Date();
//     const issuedAtTime = new Date(fine.issuedAt);
//     const timeDifferenceInHours =
//       (now.getTime() - issuedAtTime.getTime()) / (1000 * 60 * 60);

//     if (timeDifferenceInHours > 48) {
//       return NextResponse.json(
//         {
//           message:
//             "You can only update the fine within 48 hours of its creation.",
//         },
//         {status:500}
//       );
//     }

//     if (fine.status === "updated") {
//       return NextResponse.json({ message: "You can update the fine only once" }, {status:500});
//     }

//     if (fineData.amount > fine.amount) {
//       return NextResponse.json({ message: "Amount cannot be increased" }, {status:500});
//     }

//     if (fineData.amount < fine.amount - 10) {
//       return NextResponse.json(
//         { message: "Amount can only be reduced by up to 10." },
//         {status:500}
//       );
//     }


//     // Perform the update and set status to 'updated'
//     const updatedFine = await fineModel.findByIdAndUpdate(
//       id,
//       { ...fineData, status: "updated" },
//       { new: true, lean: true } // Lean query after update
//     );

//     return NextResponse.json(updatedFine);
// }catch(error:any){
//     return NextResponse.json(
//       { message: error?.message || "Internal Server Error" },
//       { status: 500 }
//     );
// }}


export async function DELETE(
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
    const deleteFine = await fineModel.findByIdAndDelete(id);

    if (!deleteFine) {
      return NextResponse.json({ message: "Fine not deleted" }, { status: 404 });
    }

    return NextResponse.json({message : "Fine deleted Successfully" , fineId : deleteFine?._id},{status:200});

  } catch (error: any) {
    return NextResponse.json(
      { message: error?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

