import mongoose from "mongoose";

const homeSchema = new mongoose.Schema(
    {
        banner1: {
            type: String,
            default: null,
        },
        banner2: {
            type: String,
            default: null,
        },
    },
    { timestamps: true }
);

export default mongoose.models.Home || mongoose.model("Home", homeSchema);