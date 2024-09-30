import { connect } from "@/dbconfig";
import userModel from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import { isValidObjectId } from 'mongoose';
import studentModel from "@/models/Student";
import fineModel from "@/models/Fine";
import sendEmail from "@/utils/mailer";
import { roleMiddleware } from "@/utils/rolemiddleware";

connect();
export async function POST(req:NextRequest){
  const roleCheck = await roleMiddleware(['HeadAdmin', 'Admin'])(req);
  if (roleCheck.status === 403) {
    return roleCheck;
  }
  try {
    const { studentId, value, label, issuedBy } = await req.json();
    if(!studentId){
        return NextResponse.json({message : "Student id required"},{status:400});
    }
    if(!value){
        return NextResponse.json({message : "Fine amount required"},{status:400});
    }
    if(!label){
        return NextResponse.json({message : "Fine reason required"},{status:400});
    }
    if(!isValidObjectId(issuedBy)){
        return NextResponse.json({message : "issueBy Admin id required"},{status:400});
    }
    const user = await userModel.findById(issuedBy);
    if(!user){
        return NextResponse.json({message : "User not found"},{status:404});
    }
    const student = await studentModel.findOne({studentId});
    if(!student){
        return NextResponse.json({message : "Student not found"},{status:500})
    }
    if (String(student.institution) !== String(user.institution)) {
    return NextResponse.json(
        { message: "Student and Admin must be from the same institution" },
        {status:400}
    );}

    const currentDate = new Date();

    const formatter:any = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Kolkata',
      hour12: false,  // Optional: Use 24-hour format
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

    const formattedDate = formatter.formatToParts(currentDate).reduce((acc:any, part:any) => {
      acc[part.type] = part.value;
      return acc;
    }, {});

    const startOfDay = new Date(`${formattedDate.year}-${formattedDate.month}-${formattedDate.day}T00:00:00+05:30`);  // Set to midnight in Asia/Kolkata timezone
    const endOfDay = new Date(`${formattedDate.year}-${formattedDate.month}-${formattedDate.day}T23:59:59+05:30`);  // Set to end of the day in Asia/Kolkata timezone


    const existingFine = await fineModel.findOne({
      student: student._id,
      reason:label,
      issuedAt: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    });
    if (existingFine && existingFine.issuedAt) {
      const currentTime = new Date();  // Get the current time
      const remainingTime = endOfDay.getTime() - currentTime.getTime();  // Calculate the remaining time until midnight
      const hours = Math.floor(remainingTime / (1000 * 60 * 60));  // Calculate hours left in the day
      const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));  // Calculate minutes left
      return NextResponse.json(
        {
          message: `Student has already been fined for this reason today. You can fine again in ${hours} hours and ${minutes} minutes.`,
        },
        {status:400}
      );
    }
    const fine = new fineModel({
      student: student._id,
      amount:value,
      reason:label,
      issuedBy,
    });
    await fine.save();
    student.totalFine = (student.totalFine || 0) + Number(value);
    student.recentFineAmount = value;
    student.finedDayTime.push(new Date());
    await student.save();
    const emailSubject = `DisciplineX just caught while ${label} `;
    const emailBody = `
    <p>Dear ${student.name},</p>

    <p>This is a reminder that a fine of <strong>INR ${value}</strong> has been issued to you due to <strong>${label}</strong>. We understand that situations arise, but addressing this promptly is essential to maintaining your good standing and reputation within the institution.</p>

    <h3>Fine Details:</h3>
    <ul>
      <li><strong>Reason:</strong> ${label}</li>
      <li><strong>Amount:</strong> INR ${value}</li>
    </ul>

    <h3>Why It Matters:</h3>
    <p>Taking swift action not only resolves the fine but also reflects positively on your commitment to discipline and excellence in our community.</p>

    <h3>Need Assistance?</h3>
    <p>If you have any questions or require assistance, feel free to reach out to us at <a href="mailto:omkarchebale0@gmail.com">support@disciplinex.com</a>. We're here to support you.</p>

    <p>Thank you for maintaining the high standards expected from all members of our institution.</p>

    <p>Best regards,</p>
    <p><strong>Your Institution | DisciplineX</strong></p>
    `;
    await sendEmail(student?.email, emailSubject, emailBody);
    return NextResponse.json(fine,{status:201});
  } catch (error:any) {
    return NextResponse.json(
      { message: error?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}