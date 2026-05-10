import mongoose from "mongoose";
const MONGO_URI = process.env.MONGO_URI as string;

if (!MONGO_URI) {
    throw new Error ("Please define MONGO_URI in .env.local");
}

let cached = (global as any).mongoose;

if (!cached) {
    cached = (global as any).mongoose ={ conn: null, promise: null };
}

export async function connectDB() {
    if (!cached.promise) {
        cached.promise = await mongoose.connect(MONGO_URI).then((mongoose) => {
            return mongoose
        });
    }
    cached.conn = await cached.promise;
    return cached.conn;
}