import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function SandwichMenu() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            <nav className="absolute top-0 w-full z-50 bg-gradient-to-r px-4 py-2 flex justify-between items-center">
                <div className="flex">
                    <img src="/images/logo.png" alt="" className="bg-white p-2 rounded-l-md w-40 h-20" />
                    <img src="/images/logo2.png" alt="" className="bg-white/80 rounded-r-md p-2 w-23 h-20" />
                </div>
                <button
                    onClick={() => setIsOpen(true)}
                    className="space-y-[3px] cursor-pointer -mt-7 focus:outline-none"
                >
                    <div className="px-2.5 bg-white py-[1.2px]"></div>
                    <div className="px-2.5 bg-white py-[1.2px]"></div>
                    <div className="px-2.5 bg-white py-[1.2px]"></div>
                </button>
            </nav>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed right-0 min-h-screen w-[25vw] bg-black text-white flex flex-col items-center justify-center z-50"
                    >
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-6 right-6 text-white"
                        >
                            <X className="w-8 h-8" />
                        </button>

                        <div className="space-y-8 flex flex-col text-center">
                            <button className="text-xl font-bold hover:text-blue-400 transition-colors">
                                Office Login
                            </button>
                            <button className="text-xl font-bold hover:text-green-400 transition-colors">
                                Public View
                            </button>
                            <button onClick={() => window.location.href='/hmpi_map'} className="text-xl font-bold hover:text-green-400 transition-colors">
                                HMPI Map
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
