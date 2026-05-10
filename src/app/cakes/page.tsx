"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function CakesPage() {
    const [products, setProducts] = useState([]);
    const [filter, setFilter] = useState("all");

    const phone = "2348140497991";

    const fetchProducts = async () => {
        const res = await axios.get("/api/cakes");
        setProducts(res.data);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const filteredProducts =
    filter === "all"
    ? products
    : products.filter(
        (item: any) => item.category === filter
    );


    return (
        <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
            <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-10 text-gray-900">
                Our Menu
                </h1>

                <div className="flex justify-center gap-4 mb-10">
                    {["all", "cake", "small chops"].map((tab) => (
                        <button
                        key={tab}
                        onClick={() => setFilter(tab)}
                        className={`px-5 py-2 rounded-full transition ${
                            filter === tab
                            ? "bg-black text-white"
                            : "bg-gray-200 text-black hover:bg-gray-300"
                        }`}
                        >
                            {tab === "all"
                            ? "All"
                            : tab === "cake"
                            ? "Cakes"
                            : "small Chops"}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredProducts.map((item: any) => (
                        <div
                        key={item._id}
                        className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition"
                        >
                         <div className="bg-white rounded-xl shadow-md overflow-hidden">
                            <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-40 object-cover"
                            />
                            </div>

                            <div className="p-4">
                                <h2 className="font-bold text-black text-lg">
                                    {item.name}
                                </h2>

                                <p className="text-gray-800 text-sm">
                                    {item.flavor}
                                </p>

                                <p className="font-semibold text-black mb-3">
                                    &#8358;{item.price}
                                </p>

                                <a
                                href={`https://wa.me/${phone}?text=Hello, I want to order ${item.name}`}
                                target="_blank"
                                className="block text-center bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
                                >
                                    Order on whatsApp
                                </a>
                            </div>
                            </div>
                    ))}
                </div>
                </div>
    );
}