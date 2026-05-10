import mongoose from "mongoose";

const CakeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        flavor: {
            type: String,
            enum: ["vanilla", "chocolate", "strawberry", "red velvet", ""],
            required: function () {
                return this.category === "cake";
            }
        },
        category: {
            type: String,
            enum: ["cake", "small chops"],
            required: true,
        },
        image: {
            type: String,
            required: false,
        },
        description: {
            type: String,
            required: false
        },
    },
    { timestamps: true }
);
export default mongoose.models.Cake || mongoose.model("Cake", CakeSchema);