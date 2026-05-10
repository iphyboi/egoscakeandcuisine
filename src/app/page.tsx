"use client";

import { useEffect, useState } from "react";
import Footer from "@/components/footer";

export default function Home() {
  const [banner1, setBanner1] = useState("");
  const [banner2, setBanner2] = useState("");
  const [home, setHome] = useState<any>(null);

  useEffect(() => {
    const fetchHome = async () => {
      try {
        const res = await fetch("/api/home");
        const data = await res.json();

        setBanner1(data.banner1);
        setBanner2(data.banner2);
      } catch (error) {
        console.log("Error loading home image");
      }
    
      };
    fetchHome();
  }, []);

  return (
   <div className="bg-white min-h-screen text-black">

    <div className="text-center py-16 px-6">
      <h1 className="text-4xl font-extrabold">
        Freshly Baked with love
      </h1>
      
      <p className="text-gray-600 mt-3">
        Cakes & Small chops for every occasion
      </p>
      </div>

    <div className="grid md:grid-cols-2 gap-10 items-center px-6 md:px-16 py-10">
      <img
      src={banner1 || "/banner.jpg"}
      className="w-full h-60 object-contain bg-white"
      alt="Banner 1"
        />

        <img 
        src={banner2 || "/banner.jpg"}
        className="w-full h-60 object-contain bg-white"
        alt="Banner 2"
        />
        </div>
  
      <div className="px-6 md:px-16 py-12">
        <h2 className="text-2xl font-bold text-black 
        mb-4">
          About Us
        </h2>

        <p className="text-gray-900 text-lg leading-relaxed">
          We bake fresh cakes and prepare delicious small chops for weddings,
          birthdays, and special events. Everythng is made with love and care.
          <br /><br />
          Our goal is simple - to make your moments sweeter, more beautiful,
          and unforgettable with baked goods that taste as good as they look.
        </p>
        </div>
        <Footer />
    </div>
  );
}