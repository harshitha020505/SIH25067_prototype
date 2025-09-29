import React from 'react'
import { Upload } from "lucide-react";

export default function Upload() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-xl p-6 border border-blue-100">
        <h2 className="text-2xl font-bold text-blue-900 mb-4 flex items-center">
          <Upload className="mr-3 text-blue-600" size={28} />
          Upload & Edit Data
        </h2>
        <p className="text-blue-700 mb-6">Upload new groundwater samples and update existing datasets</p>

        <div className="border-4 border-dashed border-blue-300 rounded-xl p-12 text-center bg-gradient-to-br from-blue-50 to-white hover:border-blue-500 transition cursor-pointer">
          <Upload size={64} className="text-blue-400 mx-auto mb-4" />
          <p className="text-blue-900 font-semibold mb-2">Drop files here or click to browse</p>
          <p className="text-blue-600 text-sm">Supported formats: CSV, Excel, JSON</p>
        </div>

        <div className="mt-6 bg-blue-50 p-6 rounded-xl border-2 border-blue-200">
          <h3 className="font-semibold text-blue-900 mb-4">Recent Uploads</h3>
          <div className="space-y-2">
            {["sample_data_jan_2025.csv", "field_report_28_09_2025.xlsx", "lab_results_batch_42.json"].map((file, idx) => (
              <div key={idx} className="bg-white p-3 rounded-lg flex justify-between items-center">
                <span className="text-blue-900 font-medium">{file}</span>
                <span className="text-blue-600 text-sm">Uploaded</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
