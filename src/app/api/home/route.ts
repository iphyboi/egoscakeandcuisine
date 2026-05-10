import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/db";
import Home from "../../../models/Home";
import { Console } from "console";

export async function GET() {
    try {
    await connectDB();

    let home = await Home.findOne();

    if (!home) {
        home = await Home.create({
            banner1: null,
            banner2: null,
        });
    }

    if (home.banner) {
        home.banner1 = home.banner;
        home.banner = undefined;
        await home.save();
    }
    return NextResponse.json(home)
} catch (error) {
    console.log(error);

    return NextResponse.json(
        { error: "Failed to fetch home data" },
        { status: 500 }
    );
}
}

export async function POST(req: Request) {
    await connectDB();

    const body = await req.json();
    console.log("BODY:", body);

    const key = Object.keys(body)[0];
    const value = body[key];
    console.log("KEY:", key);
    console.log("VALUE:", value)

    if (!key || !value) {
        return NextResponse.json({ error: "Invalid payload" }, { status: 400});
    }
    let home = await Home.findOne();

    if (!home) {
        home = await Home.create({
            banner1: null,
            banner2: null,
        });
    }

    home[key] = value;

    await home.save();

    return NextResponse.json(home);
}