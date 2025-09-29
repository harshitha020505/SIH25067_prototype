import React from 'react';
import { Database } from "lucide-react";

export default function DSS({}) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-xl p-6 border border-blue-100">
        <h2 className="text-2xl font-bold text-blue-900 mb-4 flex items-center">
          <Database className="mr-3 text-blue-600" size={28} />
          Decision Support System
        </h2>
        <p className="text-blue-700 mb-6">AI-powered groundwater quality assessment and recommendations</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border-2 border-green-200">
            <p className="text-green-700 text-sm font-semibold mb-1">Safe Zones</p>
            <p className="text-3xl font-bold text-green-800">156</p>
          </div>
          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-xl border-2 border-yellow-200">
            <p className="text-yellow-700 text-sm font-semibold mb-1">Warning Zones</p>
            <p className="text-3xl font-bold text-yellow-800">42</p>
          </div>
          <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-xl border-2 border-red-200">
            <p className="text-red-700 text-sm font-semibold mb-1">Critical Zones</p>
            <p className="text-3xl font-bold text-red-800">8</p>
          </div>
        </div>

        <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-200">
          <h3 className="font-semibold text-blue-900 mb-3">Recommended Actions</h3>
          <ul className="space-y-2 text-blue-700">
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span>Increase monitoring frequency in high-risk zones</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span>Implement water treatment protocols in 3 critical locations</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span>Schedule field inspection for areas exceeding chromium limits</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
