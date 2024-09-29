import { connect } from "@/dbconfig";
import studentModel from "@/models/Student";
import { generateToken } from "@/utils/generateToken";
import { NextRequest, NextResponse } from "next/server";
connect();

const dailyReputationPoints = 4; // 100 points / 25 days = 4 points per day
const maxReputation = 100;

export async function POST(req: NextRequest) {
  try {
    const { studentId } = await req.json();
    if (!studentId) {
      return NextResponse.json({ message: "Please provide the student ID" });
    }
    const student = await studentModel.findOne({ studentId: studentId });
    if (!student) {
      return NextResponse.json(
        { message: "Student not found" },
        { status: 404 }
      );
    }
    const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
    const lastLoginDate = student.lastLoginDate? student.lastLoginDate.toISOString().split("T")[0]: null;
    // If the student hasn't logged in today, update their login info
    if (!student.loginDays.includes(today)) {
      student.loginDays.push(today);
      // Update reputation, ensuring it does not exceed the max limit
      student.reputation = Math.min(  student.reputation + dailyReputationPoints,maxReputation);
      // Check if the last login was yesterday
      if (lastLoginDate) {
        const lastLogin = new Date(lastLoginDate);
        const todayDate = new Date(today);
        // Check if the last login was exactly one day before today (i.e., yesterday)
        const differenceInDays =
          (todayDate.getTime() - lastLogin.getTime()) / (1000 * 3600 * 24);
        if (differenceInDays === 1) {
          // Increment streak if logged in consecutively
          student.streak += 1;
        } else {
          // Reset streak if not consecutive
          student.streak = 1;
        }
      } else {
        // If there's no lastLoginDate (i.e., first login), start the streak
        student.streak = 1;
      }
      // Update last login date to today
      student.lastLoginDate = new Date();
      // Save the student's updated data
      await student.save();
    }
    // Generate token for the student
    const token = generateToken(student._id, "Student");
    return NextResponse.json({ token });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
