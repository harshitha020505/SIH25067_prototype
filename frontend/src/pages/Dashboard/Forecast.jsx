import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Search, MapPin, Droplets, AlertTriangle, CheckCircle2, AlertCircle } from "lucide-react";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function Forecast() {
  const locationData = {
    "Village A": ["Village A Well"],
    "Village B": ["Village B Well"],
    "City": ["City Reservoir 1", "City Reservoir 2"],
    "City B": ["City B Well"]
  };

  const [search, setSearch] = useState("");
  const [selectedVillage, setSelectedVillage] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [historical, setHistorical] = useState([]);
  const [predicted, setPredicted] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchError, setSearchError] = useState("");

  useEffect(() => {
    const villageKeys = Object.keys(locationData);
    const match = villageKeys.find(v => v.toLowerCase() === search.toLowerCase());
    if (match) {
      setSelectedVillage(match);
      setSearchError("");
      const types = locationData[match].map(loc => {
        if (loc.toLowerCase().includes("well")) return "Well";
        if (loc.toLowerCase().includes("reservoir")) return "Reservoir";
        return loc;
      });
      setDropdownOptions([...new Set(types)]);
    } else {
      setDropdownOptions([]);
      setSelectedVillage("");
      setSelectedType("");
    }
  }, [search]);
  useEffect(() => {
    if (selectedVillage && selectedType) {
      const loc = locationData[selectedVillage].find(l =>
        l.toLowerCase().includes(selectedType.toLowerCase())
      );
      setSelectedLocation(loc || "");
    }
  }, [selectedVillage, selectedType]);
  useEffect(() => {
    if (!selectedLocation) return;
    setIsLoading(true);
  
    const backendURL = "https://sih25067-prototype-3.onrender.com"; // <-- deployed backend
  
    fetch(`${backendURL}/predict?location=${encodeURIComponent(selectedLocation)}`)
      .then(res => res.json())
      .then(data => {
        setHistorical(data.historical);
        setPredicted(data.predicted);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, [selectedLocation]);
  

  const handleVillageSearch = (e) => {
    if (e.key === "Enter") {
      const villageKeys = Object.keys(locationData);
      const match = villageKeys.find(v => v.toLowerCase() === search.toLowerCase());
      if (!match) {
        setSearchError("Village not found! Try: Village A, Village B, City, or City B");
      } else {
        setSearchError("");
      }
    }
  };

  const getPointBorderColor = (value) => {
    if (value < 0.01) return "rgb(34, 197, 94)";
    else if (value < 0.015) return "rgb(249, 115, 22)";
    else return "rgb(239, 68, 68)";
  };

  const getStatus = (values) => {
    if (!values.length) return null;
    const avg = values.reduce((a, b) => a + b, 0) / values.length;
    if (avg < 0.01) return { label: "Safe", color: "text-green-600", bg: "bg-green-50", icon: CheckCircle2 };
    else if (avg < 0.015) return { label: "Moderate", color: "text-orange-600", bg: "bg-orange-50", icon: AlertCircle };
    else return { label: "Unsafe", color: "text-red-600", bg: "bg-red-50", icon: AlertTriangle };
  };

  const chartData = {
    labels: [
      ...historical.map((_, i) => `T-${historical.length - i}`),
      ...predicted.map((_, i) => `P${i + 1}`)
    ],
    datasets: [
      {
        label: "Historical",
        data: [...historical, ...Array(predicted.length).fill(null)],
        borderColor: "rgb(59, 130, 246)",
        borderWidth: 2,
        pointRadius: 4,
        pointBackgroundColor: "white",
        pointBorderColor: historical.map(getPointBorderColor),
        pointBorderWidth: 2,
        tension: 0.4,
      },
      {
        label: "Predicted",
        data: [...Array(historical.length).fill(null), ...predicted],
        borderColor: "rgb(168, 85, 247)",
        borderWidth: 2,
        pointRadius: 4,
        pointBackgroundColor: "white",
        pointBorderColor: predicted.map(getPointBorderColor),
        pointBorderWidth: 2,
        borderDash: [6, 3],
        tension: 0.4,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: { usePointStyle: true, padding: 12, font: { size: 11, weight: '500' } }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 8,
        titleFont: { size: 12, weight: 'bold' },
        bodyFont: { size: 11 }
      }
    },
    scales: {
      y: { ticks: { font: { size: 10 } } },
      x: { ticks: { font: { size: 10 } } }
    }
  };

  const historicalStatus = getStatus(historical);
  const predictedStatus = getStatus(predicted);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="max-w-5xl mx-auto space-y-4">
        {/* Search Section */}
        <div className="bg-white rounded-xl shadow-md p-4 border border-blue-100">
          <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
            <Search className="mr-2 text-blue-600" size={16} />
            Location Selection
          </h3>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Search Village/City</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g., Village A, City"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyPress={handleVillageSearch}
                  className="w-full px-3 py-2 pl-9 border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:outline-none"
                />
                <MapPin className="absolute left-3 top-2.5 text-gray-400" size={14} />
              </div>
              {searchError && (
                <div className="mt-1 flex items-center text-red-600 text-xs">
                  <AlertTriangle size={14} className="mr-1" />
                  {searchError}
                </div>
              )}
            </div>

            {dropdownOptions.length > 0 && (
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Water Source Type</label>
                <div className="relative">
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full px-3 py-2 pl-9 border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:outline-none appearance-none bg-white"
                  >
                    <option value="">--Select--</option>
                    {dropdownOptions.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  <Droplets className="absolute left-3 top-2.5 text-gray-400" size={14} />
                </div>
              </div>
            )}

            {selectedLocation && (
              <div className="bg-blue-50 border-l-2 border-blue-500 p-2 rounded text-xs">
                <span className="font-semibold">Selected:</span>
                <span className="ml-1 text-blue-700 font-bold">{selectedLocation}</span>
              </div>
            )}
          </div>
        </div>

        {/* Status Cards */}
        {(historicalStatus || predictedStatus) && (
          <div className="grid md:grid-cols-2 gap-4">
            {historicalStatus && (
              <div className={`${historicalStatus.bg} rounded-xl shadow p-3 border-l-2`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-gray-600">Historical</p>
                    <p className={`text-lg font-bold ${historicalStatus.color}`}>{historicalStatus.label}</p>
                  </div>
                  <historicalStatus.icon className={historicalStatus.color} size={24} />
                </div>
              </div>
            )}

            {predictedStatus && (
              <div className={`${predictedStatus.bg} rounded-xl shadow p-3 border-l-2`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-gray-600">Predicted</p>
                    <p className={`text-lg font-bold ${predictedStatus.color}`}>{predictedStatus.label}</p>
                  </div>
                  <predictedStatus.icon className={predictedStatus.color} size={24} />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Chart Section */}
        <div className="bg-white rounded-xl shadow-md p-4 border border-blue-100">
          <h3 className="text-sm font-semibold text-gray-800 mb-3">Contamination Timeline</h3>
          {isLoading ? (
            <div className="h-64 flex items-center justify-center">
              <div className="text-center space-y-2">
                <div className="w-10 h-10 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="text-gray-600 text-xs">Loading data...</p>
              </div>
            </div>
          ) : (
            <div className="h-64">
              <Line data={chartData} options={chartOptions} />
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl shadow p-4 border border-gray-200">
          <h4 className="text-xs font-semibold text-gray-700 mb-2">Legend</h4>
          <div className="grid md:grid-cols-2 gap-3 text-xs">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-1 bg-blue-500 rounded"></div>
                <span>Historical</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-1 bg-purple-500 rounded" style={{ borderTop: '2px dashed' }}></div>
                <span>Predicted</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full border shadow"></div>
                <span>Safe (&lt; 0.01)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full border shadow"></div>
                <span>Moderate (0.01 - 0.015)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full border shadow"></div>
                <span>Unsafe (&gt; 0.015)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
