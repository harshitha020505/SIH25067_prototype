import React from 'react'
import { HelpCircle } from "lucide-react";

export default function Help() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-xl p-6 border border-blue-100">
        <h2 className="text-2xl font-bold text-blue-900 mb-4 flex items-center">
          <HelpCircle className="mr-3 text-blue-600" size={28} />
          Help & Support
        </h2>
        <p className="text-blue-700 mb-6">Documentation, guides, and support resources</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { title: "User Guide", desc: "Complete documentation for all features" },
            { title: "Video Tutorials", desc: "Step-by-step video instructions" },
            { title: "FAQs", desc: "Frequently asked questions" },
            { title: "Contact Support", desc: "Get help from our technical team" },
            { title: "HMPI Methodology", desc: "Learn about calculation methods" },
            { title: "Best Practices", desc: "Guidelines for data collection" }
          ].map((item, idx) => (
            <div key={idx} className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl border-2 border-blue-200 hover:shadow-lg transition cursor-pointer">
              <h3 className="font-semibold text-blue-900 mb-2">{item.title}</h3>
              <p className="text-blue-700 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
