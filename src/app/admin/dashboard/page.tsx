"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { Libre_Franklin } from "next/font/google";

interface Cake {
    _id: string;
    name: string;
    image: string;
    price: number;
    category: string;
}

export default function Dashboard() {
    const [cakes, setCakes] = useState<Cake[]>([]);
    const [search, setSearch] = useState("");
    const [editPrice, setEditPrice] = useState("");
    const [selectedId, setSelectedId] = useState("");
    const [bannerSlot, setBannerSlot] = useState("banner1");
    const [file, setFile] = useState<File | null>(null);
    const [home, setHome] = useState<any>(null);
    const [name, setName] = useState<string>("");
    const [price, setPrice] = useState<string>("");
    const [image, setImage] = useState<string>("");
    const [ category, setCategory] = useState<string>("cake");
    const [flavor, setFlavor] = useState("");

    const fetchHome = async () => {
        const res = await axios.get("/api/home");
        setHome(res.data);
    };
    
     useEffect(() => {
    const fetchData = async () => {
        const cakeRes = await axios.get("/api/cakes");
        setCakes(cakeRes.data);
    const homeRes = await axios.get("/api/home");
    setHome(homeRes.data);
    };

    fetchData();
}, []);



const filteredCakes = cakes.filter((cake) => 
cake.name.toLowerCase().includes(search.toLowerCase())
);

const handleAddCake = async () => {
    if (!name || !price || !file) {
        return alert("please fill all fields and select image");
    }
    try {

    const formData = new FormData();
    formData.append("file", file);

    const uploadRes = await axios.post("/api/upload", formData);
    

    const imageUrl = 
    uploadRes.data?.secure_url;

    if (!imageUrl) {
        return alert ("Image upload failed");
    }

    await axios.post("/api/cakes", {
        name,
        price: Number(price),
        image: imageUrl,
        category,
        flavor: category === "cake" ? flavor : "",
    });

    const res = await axios.get("/api/cakes");
    setCakes(res.data);

    alert("Item added successfully");

    setName("");
    setPrice("")
    setImage("");
    setCategory("cake");
    setFile(null);
    setFlavor("");
} catch (error: any) {
    console.error('Error adding cakes:', error);
    alert(`Failed to add cake: ${error.response?.data?.message || error.message}`);
}
};

const handleDelete = async (id: string) => {
    await axios.delete(`/api/cakes/${id}`);

    const res = await axios.get("/api/cakes");
    setCakes(res.data);
};

    const handleBannerUpload = async () => {
        if (!file) {
            alert("Select image first");
            return;
        }

        try {

        const formData = new FormData();
        formData.append("file", file!)

        const uploadRes = await axios.post("/api/upload", formData);

        const imageUrl = uploadRes.data.url || uploadRes.data.secure_url;

        let payload = {};

        if (bannerSlot === "banner1") {
            payload = { banner1: imageUrl};
        } else {
            payload = { banner2: imageUrl};
        }
        

        await axios.post("/api/home", payload);

        alert(`Upload to ${bannerSlot}`);

        setFile(null);
        fetchHome();
    } catch (err) {
        console.log(err);
        alert("Upload failed");
    }

        };

    const handleUpdatePrice = async (id: string) => {
        if (!selectedId || !editPrice) {
            alert("Enter new price");
            return;
        }

        try {
            const res = await axios.put(`/api/cakes/${selectedId}`, 
                {
                price: Number(editPrice),
            });

            console.log(res.data);

            setCakes((prevCakes) =>
            prevCakes.map((cake) =>
            cake._id === selectedId
            ? { ...cake, price: Number(editPrice) }
            : cake
            )
        );
            alert("price updated");

            setEditPrice("");
            setSelectedId("");

        } catch (err) {
            console.log(err);
            alert("Failed to update price");
        }
    };

    return (
       <div className="p-6">
        <div className="flex justify-between items-center mb-6 border-b pb-3">
            <h1 className="text-2xl font-bold">
                Admin Dashboard - Ego's Cake andCuisine
            </h1>

            <Link href="/" className="text-blue-600">
            View site
            </Link>
        </div>

        <div className="mb-6 border p-3 rounded">
            <h2 className="font-semibold mb-2">Logo</h2>
            <img
            src="/logo.jpg"
            className="w-20 h-20 object-contain"
            />
        </div>

        <input
        type="text"
        placeholder="Search cakes or small chops..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 w-full mb-4 rounded"
        />

        <div className="mb-6 border p-3 rounded">
            <h2 className="font-semibold mb-2">Add product</h2>

            <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 mb-2 w-full"
            />

            <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border p-2 mb-2 w-ful"
            />

            <input
            type="file"
            placeholder="image/*"
            onChange={(e) => 
                setFile(e.target.files?.[0] || null)}
            className="border p-2 mb-2 w-full"
            />

            {category === "cake" && (
            <select
            value={flavor}
            onChange={(e) => setFlavor(e.target.value)}
            className="border p-2 w-full mb-2"
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
            className="border p-2 mb-2 w-full"
            >
                <option value="cake">Cakes</option>
                <option value="small chops">Small Chops</option>
            </select>

            <button
            onClick={handleAddCake}
            className="bg-black text-white px-3 py-1 rounded"
            >
                Add Product
            </button>
        </div>

        <div className="mb-6 border p-3 rounded">
            <h2 className="font-semibold mb-2">Banner Upload</h2>

            <select
            value={bannerSlot}
            onChange={(e) => setBannerSlot(e.target.value)}
            className="border p-2 mb-2"
            >
                <option value="banner1">Banner 1</option>
                <option value="banner2">Banner 2</option>
            </select>

            <input
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="block mb-2"
            />

            <button
            onClick={handleBannerUpload}
            className="bg-blue-600 text-white px-3 py-1 rounded"
            >
                Upload Banner
            </button>

            <div className="flex gap-3 mt-3">
                <img src={home?.banner1 || "/banner.jpg"} className="w-32" />
                <img src={home?.banner2 || "/banner.jpg"} className="w-32" />
            </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredCakes.map((cake) => (
            <div key={cake._id} className="border p-3 mb-3 rounded shadow-sm">

                <img
                src={cake.image || undefined}
                alt={cake.name}
                className="w-32 h-40 object-cover rounded mb-2"
                />

                <h3 className="font-semibold">
                    {cake.name}
                </h3>

                <p className="text-sm text-gray-500">
                    {cake.category}
                </p>

                <p>&#8358;{cake.price}</p>

                {selectedId === cake._id ? (
                    <div className="mt-2 flex gap-2">
                        <input
                        type="number"
                        value={editPrice}
                        onChange={(e) => setEditPrice(e.target.value)}
                        className="border p-1"
                        />

                        <button
                        onClick={() => handleUpdatePrice(cake._id)}
                        className="bg-green-500 text-white px-3 py-1 rounded"
                        >
                            Save
                        </button>
                        </div>
                ) : (
                    <button
                    onClick={() => {
                        setSelectedId(cake._id);
                        setEditPrice(String(cake.price));
                    }}
                    className="text-blue-600 mt-2"
                    >
                        Edit Price
                    </button>
                )}

                <button
                onClick={() => handleDelete(cake._id)}
                className="text-red-600 ml-4"
                >
                    Delete
                </button>
                </div>
        ))}
       </div>
       </div>
    );
}