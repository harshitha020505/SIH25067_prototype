import React from 'react'
import { Bell } from "lucide-react";

export default function Alerts() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-xl p-6 border border-blue-100">
        <h2 className="text-2xl font-bold text-blue-900 mb-4 flex items-center">
          <Bell className="mr-3 text-blue-600" size={28} />
          SMS Alert Management
        </h2>
        <p className="text-blue-700 mb-6">Configure and manage automated alerts for stakeholders</p>

        <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-200 mb-6">
          <h3 className="font-semibold text-blue-900 mb-4">Recent Alerts</h3>
          <div className="space-y-3">
            {[
              { type: "Critical", message: "Chromium levels exceeded in Zone A", time: "2 hours ago" },
              { type: "Warning", message: "Lead concentration approaching limit", time: "5 hours ago" },
              { type: "Info", message: "Monthly report ready for review", time: "1 day ago" }
            ].map((alert, idx) => (
              <div key={idx} className="bg-white p-4 rounded-lg border-l-4 border-blue-500">
                <div className="flex justify-between items-start">
                  <div>
                    <span className={`text-xs font-bold px-2 py-1 rounded ${alert.type === "Critical" ? "bg-red-200 text-red-800" :
                      alert.type === "Warning" ? "bg-yellow-200 text-yellow-800" :
                        "bg-blue-200 text-blue-800"
                      }`}>
                      {alert.type}
                    </span>
                    <p className="text-blue-900 font-semibold mt-2">{alert.message}</p>
                  </div>
                  <span className="text-blue-600 text-sm">{alert.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition shadow-lg">
          Configure Alert Settings
        </button>
      </div>
    </div>
  )
}
