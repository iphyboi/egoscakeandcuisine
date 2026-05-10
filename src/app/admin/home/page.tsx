"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function AdminHome() {
    const [banner, setBanner] = useState("");
    const [current, setCurrent] = useState("");
    const [file, setFile] = useState<File | null>(null);

    const fetchBanner = async () => {
        const res = await axios.get("/api/home");
        setCurrent(res.data.banner);
    };

    useEffect(() => {
        fetchBanner();
    }, []);

    const uploadImage = async () => {

        if (!file) {
            alert("Please select a file first");
            return;
        }

        try { 

        const formData = new FormData();
        formData.append("file", file);

        const res = await axios.post("/api/upload", formData);
        if (res.data.secure_url) {

        setBanner(res.data.secure_url);
        alert("Image uploaded successfully");
        }

    } catch (error) {
        
        alert("Uploaded failed");
    }
};

    const saveBanner = async () => {
        if (!banner) {
            alert("Please upload image first");
            return;
        }

        try {
            const res = await axios.post("/api/home", {
                banner: banner,
            });

            alert("HomePage updated successfully");
        } catch (error) {
            alert("Failed to save");
        }
    };

            return (
                <div className="p-10">
                    <h1 className="text-2xl font-bold mb-5">
                        Homepage Banner Upload
                    </h1>
                    {current && (
                        <img
                        src={current}
                        className="w-full h-auto max-h-[500px] object-contain rounded-xl mb-6"
                        />
                    )}

                    <input
                    type="file"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    className="mb-4"
                    />

                    <div className="flex gap-4">

                    <button
                    onClick={uploadImage}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        Upload Image
                    </button>

                    <button
                    onClick={saveBanner}
                    className="bg-black text-white px-5 py-2 rounded"
                    >
                        Save to Homepage
                    </button>
                </div>
                </div>
            );
        }