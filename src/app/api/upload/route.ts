import { NextResponse } from "next/server";
import cloudinary from "../../../lib/cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
    api_key: process.env.CLOUDINARY_API_KEY!,
    api_secret: process.env.CLOUDINARY_API_SECRET!,
    
});

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json(
                { error: "No file uploaded" },
                { status: 400 }
            );
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const result: any = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { folder: "bakery" }, (err, res) => {
                if (err) {
                    console.error("cloudinary Stream Error:", err);
            
                     reject(err);
                 } else {
                     resolve(res);
                 }
                }
            );
            uploadStream.end(buffer);
        });
        console.log("CLOUDINARY RESULT:", result);

        if (!result || !result.secure_url) {
            return NextResponse.json({ error: "Failed to get secure URL from cloudinary"},
                { status: 500});
        }

        return NextResponse.json({
            secure_url: result.secure_url,
        });

    } catch (error: any) {
        console.error("Upload Route Crash:", error);
        return NextResponse.json({ error: error.message}, { status: 500 });
    }
}