import React, { useEffect, useRef } from "react";
import { Map } from "lucide-react";

export default function Maps({ getLocationString, selectedState, selectedDistrict, selectedMandal }) {
  const iframeRef = useRef(null);

  useEffect(() => {
    if (!iframeRef.current) return;

    iframeRef.current.contentWindow.postMessage(
      {
        type: "zoomTo",
        location: {
          state: selectedState,
          district: selectedDistrict,
          mandal: selectedMandal,
        },
      },
      "*"
    );
  }, [selectedState, selectedDistrict, selectedMandal]);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-xl p-6 border border-blue-100">
        <h2 className="text-2xl font-bold text-blue-900 mb-4 flex items-center">
          <Map className="mr-3 text-blue-600" size={28} />
          Interactive Groundwater Maps
        </h2>
        <p className="text-blue-700 mb-6">
          Visualize groundwater quality and heavy metal distribution for {getLocationString()}
        </p>

        <div className="w-full" style={{ height: "calc(150vh)" }}>
          <iframe
            ref={iframeRef}
            src="/hmpi_map.html"
            title="HMPI Groundwater Quality Map"
            width="100%"
            height="100%"
            className="border-none"
          />
        </div>
        <p className="text-right">Know More About the Calculation Of HMPI from <span onClick={() => window.location.href="/hmpi_info"} className="text-blue-800 hover:underline">here</span></p>
      </div>
    </div>
  );
}
