import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/db";
import Cake from "../../../../models/Cake";

// GET SINGLES CAKE
export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        await connectDB();

        const cake = await Cake.findById(id);

        if (!cake) {
        return NextResponse.json(
            { message: "Cake not found" },
            { status: 404 }
        );
    }

    return NextResponse.json(cake);
} catch (error) {
    return NextResponse.json(
        { message: "Cake not found or database error" },
        { status: 404}
    );
}
}

// UPDATE CAKE
export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await connectDB();

        const body = await req.json();
        console.log("Updating ID:", id, "with data:", body);

        const updatedCake = await Cake.findByIdAndUpdate(
            id,
            { price: Number(body.price) },
            { new: true, runValidators: true }
        );

        if (!updatedCake) {
            return NextResponse.json({ message: "Cake not found" }, { status: 404});
        }

        return NextResponse.json(updatedCake);
    } catch (error) {
        return NextResponse.json(
            { message: "Error updating cake" },
            { status: 500 }
        );
    }
}

// DELETE CAKE
export async function DELETE(
req: Request,
{ params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        await connectDB();
        const deleted = await Cake.findByIdAndDelete(id);

        if (!deleted) {
            return NextResponse.json(
                { error: "Cake not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ message: "Cake deleted" }, { status: 200 });
        
    } catch (error: any) {
        console.error("DELETE ERROR:", error);

        return NextResponse.json(
            { message: "Error deleting cake" },
            { status: 500 }
        );
    }
}