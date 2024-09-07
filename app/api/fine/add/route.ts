import { connect } from "@/dbconfig";
import userModel from "@/models/User";
import { NextResponse } from "next/server";
import { isValidObjectId } from 'mongoose';
import studentModel from "@/models/Student";
import fineModel from "@/models/Fine";
import sendEmail from "@/utils/mailer";

connect();
export async function POST(req:Request){
  try {
    const { studentId, amount, reason, issuedBy } = await req.json();
    if(!studentId){
        return NextResponse.json({message : "Student id required"},{status:400});
    }
    if(!amount){
        return NextResponse.json({message : "Fine amount required"},{status:400});
    }
    if(!reason){
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

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const existingFine = await fineModel.findOne({
      student: student._id,
      reason,
      issuedAt: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    });

 
    if (existingFine && existingFine.issuedAt) {
        const issuedAtDate = new Date(existingFine.issuedAt);

          const nextAvailableFineTime = new Date(issuedAtDate);
          nextAvailableFineTime.setDate(nextAvailableFineTime.getDate() + 1);

          const remainingTime =
            nextAvailableFineTime.getTime() - new Date().getTime();
          const hours = Math.floor(remainingTime / (1000 * 60 * 60));
          const minutes = Math.floor(
            (remainingTime % (1000 * 60 * 60)) / (1000 * 60)
          );
      

      return NextResponse.json(
        {
          message: `Student has already been fined for this reason today. You can fine again in ${hours} hours and ${minutes} minutes.`,
        },
        {status:400}
      );
    }

    const fine = new fineModel({
      student: student._id,
      amount,
      reason,
      issuedBy,
    });

    await fine.save();

    student.totalFine = (student.totalFine || 0) + Number(amount);
    student.recentFineAmount = amount;
    student.finedDayTime.push(new Date());
    await student.save();

    // email
    const emailSubject = `🚨 Urgent: Fine Issued for ${reason} - Take Action Now`;
    const emailBody = `
    <p>Dear ${student.name},</p>

    <p>We hope this message finds you well. However, we need to bring to your attention that you've recently been fined due to <strong>${reason}</strong>. The amount due is <strong>INR ${amount}</strong>.</p>

    <h3>Why This Matters</h3>
    <p>We understand that college life can be demanding, and sometimes things slip through the cracks. However, maintaining discipline is crucial not just for your academic journey but also for your personal growth. It reflects on your commitment to your future and the community around you.</p>

    <h3>What You Need to Do</h3>
    <p>Please take care of this fine as soon as possible to avoid any additional penalties or complications. <strong>You can easily settle the amount via <a href="[Your Payment Portal/Link]" target="_blank">this payment portal</a>.</strong></p>

    <h3>A Friendly Reminder</h3>
    <p>Discipline is the bridge between goals and accomplishment. By addressing this matter promptly, you're not just avoiding penalties—you're also demonstrating your responsibility and commitment to your success.</p>

    <h3>We're Here for You</h3>
    <p>If you have any concerns or need assistance, don't hesitate to reach out to us. We're here to support you in any way we can.</p>

    <p>Thank you for your immediate attention to this matter.</p>

    <p>Best Regards,</p>
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