import React from "react";
import { Droplet } from "lucide-react"; // water drop icon

export default function AquaRootLogo({ className = "" }) {
  return (
    <div className={`flex suse-mono bg-white p-2 text-center rounded-xl  items-center gap-2 ${className}`}>
      {/* Icon */}
      <div className="p-1 pb-2  bg-gradient-to-br from-blue-500 to-blue-700 rounded-full shadow-md">
        <Droplet className="w-6 h-5 text-white" />
      </div>

      {/* Text */}
      <h1 className="text-4xl font-extrabold tracking-tight">
        <span className="bg-gradient-to-r from-blue-500  to-blue-700 bg-clip-text text-transparent">
          Aqua
        </span>
        
        <span className="bg-gradient-to-r from-gray-800  to-gray-600 bg-clip-text text-transparent">
          Root
        </span>

      </h1>
    </div>
  );
}
