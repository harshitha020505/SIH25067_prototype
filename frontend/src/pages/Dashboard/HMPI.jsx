import React from 'react'
import { Activity } from "lucide-react";

export default function HMPI({heavyMetals, }) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-xl p-6 border border-blue-100">
        <h2 className="text-2xl font-bold text-blue-900 mb-4 flex items-center">
          <Activity className="mr-3 text-blue-600" size={28} />
          Heavy Metal Pollution Index Calculator
        </h2>
        <p className="text-blue-700 mb-6">Automated computation of HMPI using standard methodologies</p>

        <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white p-6 rounded-xl mb-6 shadow-lg">
          <p className="text-blue-200 text-sm mb-2">Overall HMPI Score</p>
          <p className="text-5xl font-bold mb-2">42.3</p>
          <p className="text-blue-100">Moderate Pollution Level</p>
        </div>

        <h3 className="font-semibold text-blue-900 mb-4 text-lg">Heavy Metal Concentrations</h3>
        <div className="space-y-3">
          {heavyMetals.map((metal, idx) => (
            <div key={idx} className="bg-blue-50 p-4 rounded-xl border border-blue-200">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-blue-900">{metal.name}</span>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${metal.status === "safe" ? "bg-green-200 text-green-800" :
                  metal.status === "warning" ? "bg-yellow-200 text-yellow-800" :
                    "bg-red-200 text-red-800"
                  }`}>
                  {metal.status.toUpperCase()}
                </span>
              </div>
              <div className="flex justify-between text-sm text-blue-700">
                <span>Current: {metal.current} {metal.unit}</span>
                <span>Limit: {metal.limit} {metal.unit}</span>
              </div>
              <div className="mt-2 bg-blue-200 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full ${metal.status === "safe" ? "bg-green-500" :
                    metal.status === "warning" ? "bg-yellow-500" :
                      "bg-red-500"
                    }`}
                  style={{ width: `${Math.min((metal.current / metal.limit) * 100, 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <button className="w-full mt-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition shadow-lg">
          Recalculate HMPI with New Data
        </button>
      </div>
    </div>
  )
}
