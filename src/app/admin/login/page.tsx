"use client";

import { useState } from "react";
import axios from "axios";

export default function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            const res = await axios.post("/api/auth/login", {
                email,
                password,
            });

            localStorage.setItem("token", res.data.token);

            alert("Login successfully");
            window.location.href="/admin/dashboard";
        } catch (err) {
            alert("Invalid credentials");
        }
    };

    return (
        <div className="p-10 max-w-md mx-auto">
            <h1 className="text-2x1 font-bold mb-4">Admin Login</h1>

            <input
            type="email"
            placeholder="Email"
            className="border p-2 w-full mb-3"
            onChange={(e) => setEmail(e.target.value)}
            />

            <input
            type="password"
            placeholder="password"
            className="border p-2 w-full mb-3"
            onChange={(e) => setPassword(e.target.value)}
            />

            <button
            onClick={handleLogin}
            className="bg-black text-white px-4 py-2 w-full"
            >
                Login
            </button>
        </div>
    );
}