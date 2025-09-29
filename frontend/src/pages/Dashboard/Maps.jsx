import React, { useState } from "react";
import { Map } from "lucide-react";

export default function Maps({ getLocationString }) {
  const [loading, setLoading] = useState(true);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-xl p-6 border border-blue-100">
        <h2 className="text-2xl font-bold text-blue-900 mb-4 flex items-center">
          <Map className="mr-3 text-blue-600" size={28} />
          Interactive Groundwater Maps
        </h2>
        <p className="text-blue-700 mb-6">
          Visualize groundwater quality and heavy metal distribution for{" "}
          {getLocationString()}
        </p>

        <div className="relative bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl h-[75vh] border-2 border-blue-200 overflow-hidden">
          {/* Loading Overlay */}
          {loading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/70 backdrop-blur-sm z-10">
              <Map size={48} className="text-blue-500 animate-bounce mb-3" />
              <p className="text-blue-600 font-semibold">Loading Interactive Map...</p>
              <p className="text-blue-500 text-sm">Heat maps showing heavy metal concentrations</p>
            </div>
          )}

          {/* Iframe Map */}
          <iframe
            src="/hmpi_map.html"
            title="HMPI Groundwater Quality Map"
            width="100%"
            height="100%"
            className="border-none rounded-xl"
            onLoad={() => setLoading(false)}
          />
        </div>
      </div>
    </div>
  );
}
