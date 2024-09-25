import { connect } from "@/dbconfig";
import userModel from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs'
import { generateToken } from "@/utils/generateToken";

 connect();

export async function POST(req: Request) {
    try {
    const reqBody = await req.json();
    const { email, password } = reqBody;

       // Check if the user exists
    const user = await userModel.findOne({ email });
    if (!user) {
        return NextResponse.json({ message: "Invalid email or password" },{status: 400});
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return NextResponse.json({ message: "Invalid email or password" },{status: 400});
    }

       // Generate JWT token
       const token = generateToken(user?._id, user?.role);
   return NextResponse.json(
    {token },
    { status: 200 }
   );
} catch (error: any) {
    return NextResponse.json({ error: "Failed to login" }, { status: 500 });
}
}
