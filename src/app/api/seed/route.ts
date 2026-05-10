import bcrypt from "bcryptjs";
import { connectDB } from "../../../lib/db";
import Admin from "../../../models/Admin";
import { NextResponse } from "next/server";

export async function GET() {
    try {
    await connectDB();
    const email = "treasureejikeme00@gmail.com";
    const password = "rosemary123";

    const existing = await Admin.findOne({ email });

    if (existing) {
        return NextResponse.json({ message: "Admin already existed" })
    }

    const hashed = await bcrypt.hash(password, 10);

    await Admin.create({
        email,
        password: hashed,
        role: "admin",
    });

return NextResponse.json({
    message: "Admin created successfully",
    email,
    password,
});
    } catch (error: any) {
        return NextResponse.json({
            error: error.message,
        });
    }
    }