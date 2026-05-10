export default function Footer() {
    return (
        <footer className="bg-black text-white mt-10 p-6">
            <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-xl font-bold">
                    Ego's Cake and Cuisine
                </h2>

                <p className="text-gray-300 mt-2">
                    Freshly baked cakes and delicious small chops
                </p>

                <p className="text-gray-500 text-sm mt-4">
                    &copy; {new Date().getFullYear()} All rights reserves
                </p>
            </div>
        </footer>
    );
}