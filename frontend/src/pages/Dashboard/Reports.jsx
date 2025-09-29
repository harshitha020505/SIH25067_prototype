import React from 'react'
import { FileText } from "lucide-react";

export default function Reports() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-xl p-6 border border-blue-100">
        <h2 className="text-2xl font-bold text-blue-900 mb-4 flex items-center">
          <FileText className="mr-3 text-blue-600" size={28} />
          Reports & Analytics
        </h2>
        <p className="text-blue-700 mb-6">Generate comprehensive reports for stakeholders</p>

        <div className="space-y-4">
          {["Monthly Water Quality Report", "Heavy Metal Analysis Summary", "Compliance Report", "Field Inspection Report"].map((report, idx) => (
            <div key={idx} className="bg-gradient-to-r from-blue-50 to-white p-4 rounded-xl border-2 border-blue-200 flex justify-between items-center hover:shadow-lg transition">
              <div className="flex items-center">
                <FileText className="text-blue-600 mr-3" size={24} />
                <div>
                  <p className="font-semibold text-blue-900">{report}</p>
                  <p className="text-sm text-blue-600">Last generated: {new Date().toLocaleDateString()}</p>
                </div>
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-semibold">
                Download
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
