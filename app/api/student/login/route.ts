import { connect } from "@/dbconfig";
import studentModel from "@/models/Student";
import { generateToken } from "@/utils/generateToken";
import { NextResponse } from "next/server";

const dailyReputationPoints = 4; // 100 points / 25 days = 4 points per day
const maxReputation = 100;

connect();

export async function POST(req: Request) {
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
    const lastLoginDate = student.lastLoginDate
      ? student.lastLoginDate.toISOString().split("T")[0]
      : null;

    if (!student.loginDays.includes(today)) {
      student.loginDays.push(today);
      student.reputation = Math.min(
        student.reputation + dailyReputationPoints,
        maxReputation
      );

      if (
        lastLoginDate &&
        new Date(today).getTime() - new Date(lastLoginDate).getTime() ===
          86400000
      ) {
        // If the last login date was yesterday, increment the streak
        student.streak += 1;
      } else {
        // Otherwise, reset the streak
        student.streak = 1;
      }

      student.lastLoginDate = new Date();
      await student.save();
    }

    const token = generateToken(student._id, "Student");

    return NextResponse.json({ token, student });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
