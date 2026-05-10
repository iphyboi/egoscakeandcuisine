"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminPage() {
    const [products, setProducts] = useState<any[]>([]);

    //fetch products
    const fetchProducts = async () => {
        const res = await fetch("/api/cakes", {
            cache: "no-store",
        });

        const data = await res.json();
        setProducts(data);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = async (id: string) => {
        console.log("Deleting:", id);
    const confirmDelete = window.confirm(
        "Are you sure you want to delete this item?"
    );

    if (!confirmDelete) return;

    try {
        console.log("Deleting ID:", id);

        const res = await axios.delete(`/api/cakes/${id}`);

        if (res.status === 200) {
            alert("Deleted successfully");

        await fetchProducts();
        }

    } catch (error) {
        alert ("Failed to delete")
    }
};

return (
    <div className="p-10">
        <h1 className="text-2xl font-bold mb-6">
            Admin Dashboard
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((item: any) => (
                <div
                key={item._id}
                className="bg-white shadow-md rounded-lg p-4"
                >
                    <img
                    src={item.image}
                    className="w-full h-40 object-cover mb-3"
                    />

                    <h2 className="font-bold text-black">
                        {item.name}
                    </h2>

                    <p className="text-gray-600 text-sm">
                        {item.flavor || "-"}
                    </p>

                    <p className="font-semibold">
                        &#8358;{item.price}
                    </p>

                    <button
                    onClick={() => handleDelete(item._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded mt-3 w-full"
                    >
                        Delete
                    </button>
                    </div>
            ))}
        </div>
    </div>
);
}