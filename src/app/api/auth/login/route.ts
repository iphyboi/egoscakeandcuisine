import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/db";
import Admin from "../../../../models/Admin";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
    try {
        await connectDB();

        const { email, password } = await req.json();
        const admin = await Admin.findOne({ email });
          console.log("Admin attempt:", email);

        if (!admin) {
            return NextResponse.json(
                { message: "Admin not found" },
                { status: 401 }
            );
        }

        const isMatch = await bcrypt.compare(password, admin.password);
           console.log("Paasword match:", isMatch);
        if (!isMatch) {
            return NextResponse.json(
                { message: "Wrong password" },
                { status: 401 }
            );
        }

        const token = jwt.sign(
            { id: admin._id, role: admin.role },
            process.env.JWT_SECRET as string,
            { expiresIn: "1d" }
        );
        return NextResponse.json({ token })

    } catch (error: any) {
        console.log("LOGIN ERROR:", error.message);

        return NextResponse.json(
            { message: "Server error" },
            { status: 500 }
        );
    }
}