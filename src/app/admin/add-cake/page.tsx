"use client";

import { useState } from "react";
import axios from "axios";

export default function addCake() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [flavor, setFlavor] = useState("");
    const [uploading, setUploading] = useState(false);
    const [creating, setCreating] = useState(false);
    const [image, setImage] = useState("");
    const [category, setCategory] =useState("");

    //upload image to cloudinary
    const uploadImage = async (file: File) => {
        try {
            setUploading(true);

            const formData = new FormData();
            formData.append("file", file);

            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Upload failed");
            }

            if (!data.secure_url) {
                throw new Error("No image URL returned");
            }

            setImage(data.secure_url);

        } catch (error: any) {
            console.error(error);

            alert(error.message);
        } finally {
            setUploading(false);
        }
    };

        // create cake
    const handleSubmit = async () => {
        try {
            if (!name || !price || !category || !image) {
                alert ("please fill all fields");
                return;
            }

            if (category === "cake" && !flavor) {
                alert("Please select a flavor for cake");
                return;
            }

            setCreating(true);

        await axios.post("/api/cakes", {
                name,
                price: Number(price),
                image,
                category,
                flavor: category === "cake" ? flavor : ""
        });

        alert("Item added");
        window.location.href = "/admin/dashboard";

        //reset form
        setName("");
        setPrice("");
        setFlavor("");
        setCategory("");
        setImage("");
    } catch (error) {
        console.error(error);
        alert("Failed to create cake");
    } finally {
        setCreating(false);
    }
};


    
    return (
        <div className="p-10 max-w-md mx-auto">
            <h1 className="text-xl mb-4">Add Cake</h1>

            <input
            placeholder="Cake Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 w-full mb-2"
            />

            <input
            placeholder="Price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border p-2 w-full mb-2"
            />

            {category === "cake" && (
            <select
            value={flavor}
            onChange={(e) => setFlavor(e.target.value)}
            className="border p-2 w-full mb-3"
            >

                <option value="">Select Flavor</option>
                <option value="vanilla">Vanilla</option>
                <option value="chocolate">Chocolate</option>
                <option value="strawberry">Strawberry</option>
                <option value="red velvet">Red velvet</option>
                </select>
            )}

            <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-2 w-full mb-3"
            >

                <option value="">Select Category</option>
                <option value="cake">Cake</option>
                <option value="small chops">Small Chops</option>
            </select>

            <input
            type="file"
            className="mb-3"
            onChange={(e) => {
                if (e.target.files?.[0]) {
                    uploadImage(e.target.files[0]);
                }
            }}
            />

            {uploading && <p>Uploading image...</p>}

            {image && (
                <img
                src={image}
                alt="preview"
                className="w-full h-40 object-cover mb-3 rounded"
                />
            )}

            <button 
            onClick={handleSubmit}
            disabled={creating}
            className="bg-black text-white px-4 py-2 w-full"
            >
                {creating ? "adding..." : "Add Cake"}
            </button>
        </div>
    );
}