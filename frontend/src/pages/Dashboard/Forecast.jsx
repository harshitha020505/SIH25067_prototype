import React from 'react'
import { BarChart3, AlertTriangle } from "lucide-react";

export default function Forecast() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-xl p-6 border border-blue-100">
        <h2 className="text-2xl font-bold text-blue-900 mb-4 flex items-center">
          <BarChart3 className="mr-3 text-blue-600" size={28} />
          Time Series Forecasting
        </h2>
        <p className="text-blue-700 mb-6">Predictive analytics for heavy metal concentration trends</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border-2 border-blue-200">
            <h3 className="font-semibold text-blue-900 mb-4">30-Day Forecast</h3>
            <div className="bg-white rounded-lg h-48 flex items-center justify-center border border-blue-200">
              <BarChart3 size={48} className="text-blue-400" />
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border-2 border-blue-200">
            <h3 className="font-semibold text-blue-900 mb-4">90-Day Projection</h3>
            <div className="bg-white rounded-lg h-48 flex items-center justify-center border border-blue-200">
              <BarChart3 size={48} className="text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
          <div className="flex items-start">
            <AlertTriangle className="text-yellow-600 mr-3 mt-1" size={20} />
            <div>
              <p className="font-semibold text-yellow-900">Predicted Increase in Lead Concentration</p>
              <p className="text-yellow-800 text-sm">Model predicts 15% increase in lead levels over next 60 days</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
