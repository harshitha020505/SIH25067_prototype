import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import Button from "../../components/Button";
import AquaRootLogo from "../../components/Logo";

export default function SandwichMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate(); // ✅ Initialize navigate

    return (
        <div className="relative">
            <nav className="absolute top-0 w-full z-50 bg-gradient-to-r px-4 py-2 flex justify-between items-center">
                <div className="flex gap-2 items-center bg-white rounded-xl pl-2">
                    <AquaRootLogo />
                    <div className="border-r-2 border-black h-10 p-2"></div>
                    <div className="flex">
                        <img src="/images/logo.png" alt="" className="bg-white p-2 rounded-l-md w-40 h-20" />
                        <img src="/images/logo2.png" alt="" className="bg-white/80 rounded-r-md p-2 w-23 h-20" />
                    </div>
                </div>

                {/* ✅ Use navigate instead of window.location.href */}
                <button
                    onClick={() => navigate("/admin/login")}
                    className="shadow-2xl cursor-pointer bg-blue-500 quantico hover:text-white duration-200 text-white rounded-full px-4 py-2"
                >
                    Admin Login
                </button>
            </nav>
        </div>
    );
}
