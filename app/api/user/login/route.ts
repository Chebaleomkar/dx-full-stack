import { connect } from "@/dbconfig";
import userModel from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import { generateToken } from "@/utils/generateToken";
connect();

export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json();
        if (!email) {
            return NextResponse.json({ message: "Email is required" }, { status: 400 });
        }
        if (!password) {
            return NextResponse.json({ message: "Password is required" }, { status: 400 });
        }
        const user = await userModel.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: "Email not found" }, { status: 404 });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json({ message: "Incorrect password" }, { status: 401 });
        }
        const token = generateToken(user._id, user.role);
        return NextResponse.json({ token }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: "Failed to login", error: error.message }, { status: 500 });
    }
}
