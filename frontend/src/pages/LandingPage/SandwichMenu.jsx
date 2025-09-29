import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../../components/Button";

export default function SandwichMenu() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            <nav className="absolute top-0 w-full z-50 bg-gradient-to-r px-4 py-2 flex justify-between items-center">
                <div className="flex">
                    <img src="/images/logo.png" alt="" className="bg-white p-2 rounded-l-md w-40 h-20" />
                    <img src="/images/logo2.png" alt="" className="bg-white/80 rounded-r-md p-2 w-23 h-20" />
                </div>
                <Button
                    func={() => window.location.href = '/admin/login'}
                    text="admin Login"
                    style=""
                />
            </nav>

            
        </div>
    );
}