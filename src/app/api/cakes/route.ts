import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/db";
import Cake from "../../../models/Cake";

// GET ALL CAKES
export async function GET() {
    try {
        await connectDB();
        const cakes = await Cake.find();
        return NextResponse.json(cakes);
    } catch (error: any) {
        console.error(error);
        return NextResponse.json(
            { message: "Error fetching cakes", error: error.message },
            { status: 500 }
        );
    }
}

// CREATE CAKE
export async function POST(req: Request) {
    try {
        await connectDB();
        const body = await req.json();
        console.log("BODY RECEIVED:", body);

        const newCake = await Cake.create({
            name: body.name,
            price: body.price,
            flavor: body.flavor,
            image: body.image || "",
            category: body.category
        });
        return NextResponse.json(newCake);

    } catch (error: any) {
        console.error("CREATE CAKE ERROR:", error);
        return NextResponse.json(
            { message: "Cake validation failed", error: error.message},
            { status: 400 }
        );
    }
}

export async function DELETE(
    req: Request,
    { params } : { params: Promise<{id: string }> }
) {
    try {
        const { id } = await params;

        await connectDB();

        const deletedCake = await Cake.findByIdAndDelete(id);
        if (!deletedCake) {
            return;
            NextResponse.json({ message: "Cake not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Deleted successfully"}, { status: 200 });
        
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}