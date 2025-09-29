import React from 'react'
import { motion, AnimatePresence } from "framer-motion";

export default function NavBar({ allowedNav, activeTab, setActiveTab }) {
    return (
        <nav className="fixed bottom-6 left-1/2 transform backdrop-blur-[5px] -translate-x-1/2 shadow-lg rounded-full px-8  flex space-x-2 border  z-50">
            {allowedNav.map((item) => (
                <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center text-xs  pr-2 py-2  font-semibold transition-all duration-200 ${activeTab === item.id
                            ? "text-blue-700 "
                            : "text-gray-500 hover:text-blue-500 hover:scale-105"
                        }`}
                >
                    <div className={`p-2 rounded-full mb-1}`}>
                        {item.icon}
                    </div>
                    <span>{item.label}</span>
                </button>
            ))}
        </nav>
    )
}
