import { connect } from "@/dbconfig";
import userModel from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { generateToken } from "@/utils/generateToken";

connect();

export async function POST(req: Request) {
   try {
    const reqBody = await req.json();
    const { name, email, password, role, institution } = reqBody;
    // Check if the user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
    return NextResponse.json({ message: "User already exists" }, {status:400});
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new userModel({
    name,
    email,
    password: hashedPassword,
    role,
    institution,
    });

    // Save the user
    await newUser.save();

    // Generate JWT token
    const token = generateToken(newUser?._id, newUser?.role);

    return NextResponse.json({ token, user: newUser }, {status:201});
   } catch (error: any) {
    return NextResponse.json({ message: error?.message || "Internal Server Error" }, {status:500});
   }
}
