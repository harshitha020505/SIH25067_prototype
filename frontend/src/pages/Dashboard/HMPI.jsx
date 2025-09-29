import React from 'react'
import { Activity } from "lucide-react";

export default function HMPI({ heavyMetals }) {
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl shadow-md p-4 border border-blue-100">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-white p-6 rounded-xl shadow">
  {/* Left Section */}
  <div>
    <h2 className="text-lg font-bold text-blue-900 mb-2 flex items-center">
      <Activity className="mr-2 text-blue-600" size={20} />
      Heavy Metal Pollution Index
    </h2>
    <p className="text-blue-700 text-sm">
      Automated computation of HMPI using standard methodologies
    </p>
  </div>

  {/* Right Section (Card) */}
  <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white p-5 rounded-xl shadow-md w-56 text-center">
    <p className="text-blue-200 text-xs mb-1">Overall HMPI Score</p>
    <p className="text-4xl font-extrabold mb-1">42.3</p>
    <p className="text-blue-100 text-sm font-medium">Moderate Pollution Level</p>
  </div>
</div>




        {/* Metals Section */}
        <h3 className="font-semibold text-blue-900 mb-2 text-sm">Heavy Metal Concentrations</h3>
        <div className="grid grid-cols-2  gap-2 items-center ">
          {heavyMetals.map((metal, idx) => (
            <div key={idx} className="bg-blue-50 p-3 rounded-lg border border-blue-200">
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold text-blue-900 text-sm">{metal.name}</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${metal.status === "safe"
                    ? "bg-green-200 text-green-800"
                    : metal.status === "warning"
                      ? "bg-yellow-200 text-yellow-800"
                      : "bg-red-200 text-red-800"
                    }`}
                >
                  {metal.status.toUpperCase()}
                </span>
              </div>
              <div className="flex justify-between text-xs text-blue-700">
                <span>Current: {metal.current} {metal.unit}</span>
                <span>Limit: {metal.limit} {metal.unit}</span>
              </div>
              <div className="mt-1 bg-blue-200 rounded-full h-1.5 overflow-hidden">
                <div
                  className={`h-full ${metal.status === "safe"
                    ? "bg-green-500"
                    : metal.status === "warning"
                      ? "bg-yellow-500"
                      : "bg-red-500"
                    }`}
                  style={{ width: `${Math.min((metal.current / metal.limit) * 100, 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Button */}

      </div>
    </div>
  );
}
