import { DUMMY_STUDENT_ID, DUMMY_USER_ID } from "@/constant";
import { connect } from "@/dbconfig";
import fineModel from "@/models/Fine";
import institutionModel from "@/models/Institution";
import studentModel from "@/models/Student";
import userModel from "@/models/User";
import mongoose, { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";

connect();

export async function GET(
  req: Request,
  { params }: { params: { institutionId: string } }
) {
  try {
    const { institutionId } = params;
    const { searchParams } = new URL(req.url);
    const filterType = searchParams.get('filterType');
    const selectedMonth = searchParams.get('selectedMonth');


    if(!isValidObjectId(institutionId)){
      return NextResponse.json({message : "Invalid Institution ID" } , {status : 400});
    }
    
    // Fetch the institution details
    const institution = await institutionModel.findById(institutionId);
    if (!institution) {
      return NextResponse.json({ error: 'Institution not found' }, { status: 404 });
    }
    const student = await studentModel.findById(DUMMY_STUDENT_ID)
    const user = await userModel.findById(DUMMY_USER_ID)

    const institutionCreationDate = institution.createdAt;
    let dateFilter = {};

    // Handle different filter types
    if (filterType === 'year') {
      const currentYear = new Date().getFullYear();
      dateFilter = {
        issuedAt: {
          $gte: new Date(currentYear, 0, 1), // From Jan 1st of the current year
          $lte: new Date() // Up to the current date
        }
      };
    } else if (filterType === 'month') {
      const monthIndex = new Date(Date.parse(`${selectedMonth} 1, ${new Date().getFullYear()}`)).getMonth();
      const year = new Date().getFullYear();
      dateFilter = {
        issuedAt: {
          $gte: new Date(year, monthIndex, 1), // From the start of the selected month
          $lt: new Date(year, monthIndex + 1, 1), // Up to the start of the next month
        }
      };
    } else if (filterType === 'fortnight') {
      const currentDate = new Date();
      const fifteenDaysAgo = new Date();
      fifteenDaysAgo.setDate(currentDate.getDate() - 15);
      dateFilter = {
        issuedAt: {
          $gte: fifteenDaysAgo,
          $lte: currentDate
        }
      };
    } else if (filterType === 'week') {
      const currentDate = new Date();
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(currentDate.getDate() - 7);
      dateFilter = {
        issuedAt: {
          $gte: sevenDaysAgo,
          $lte: currentDate
        }
      };
    } else if (filterType === 'today') {
      const currentDate = new Date();
      dateFilter = {
        issuedAt: {
          $gte: new Date(currentDate.setHours(0, 0, 0, 0)), // Start of today
          $lte: new Date(currentDate.setHours(23, 59, 59, 999)) // End of today
        }
      };
    } else {
      return NextResponse.json({ error: 'Invalid filter type' }, { status: 400 });
    }

    // Fetch fines based on the date filter
    const fines = await fineModel.find(dateFilter)
      .populate('student', 'studentId name') // Populate student details
      .populate('issuedBy', 'name'); // Populate issuer details

    // Return the response
    return NextResponse.json(fines);
  } catch (error: any) {
    return NextResponse.json(
      { message: error?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
