import React, { useState } from "react";
import { jsPDF } from "jspdf";
import { Search, Download, Droplet, AlertTriangle, TrendingUp, Award, Lightbulb, Calendar } from "lucide-react";

const mandalData = {
  "Visakhapatnam Rural": { lead: 0.008, mercury: 0.001, arsenic: 0.005, district: "Visakhapatnam" },
  "Anakapalli": { lead: 0.009, mercury: 0.002, arsenic: 0.007, district: "Anakapalli" },
  "Tirupati": { lead: 0.012, mercury: 0.003, arsenic: 0.009, district: "Tirupati" },
  "Guntur West": { lead: 0.011, mercury: 0.002, arsenic: 0.008, district: "Guntur" },
  "Vijayawada": { lead: 0.010, mercury: 0.002, arsenic: 0.008, district: "Krishna" },
  "Kakinada": { lead: 0.013, mercury: 0.004, arsenic: 0.011, district: "East Godavari" },
  "Rajahmundry": { lead: 0.014, mercury: 0.004, arsenic: 0.012, district: "East Godavari" },
  "Nellore": { lead: 0.009, mercury: 0.002, arsenic: 0.006, district: "Nellore" },
  "Kurnool": { lead: 0.015, mercury: 0.005, arsenic: 0.013, district: "Kurnool" },
  "Anantapur": { lead: 0.016, mercury: 0.005, arsenic: 0.014, district: "Anantapur" },
  "Chittoor": { lead: 0.011, mercury: 0.003, arsenic: 0.009, district: "Chittoor" },
  "Kadapa": { lead: 0.013, mercury: 0.004, arsenic: 0.010, district: "Kadapa" },
  "Eluru": { lead: 0.010, mercury: 0.002, arsenic: 0.007, district: "West Godavari" },
  "Ongole": { lead: 0.012, mercury: 0.003, arsenic: 0.009, district: "Prakasam" },
  "Machilipatnam": { lead: 0.008, mercury: 0.001, arsenic: 0.006, district: "Krishna" },
};

const thresholds = { lead: 0.01, mercury: 0.002, arsenic: 0.01 };

function calculateWSI(reading) {
  if (!reading) return 0;
  let score = 100;
  if (reading.lead > thresholds.lead) score -= 30;
  if (reading.mercury > thresholds.mercury) score -= 30;
  if (reading.arsenic > thresholds.arsenic) score -= 40;
  return Math.max(score, 0);
}

function getAlerts(reading) {
  if (!reading) return [];
  const alerts = [];
  if (reading.lead > thresholds.lead * 2) alerts.push({ metal: "Lead", level: "Critical" });
  else if (reading.lead > thresholds.lead) alerts.push({ metal: "Lead", level: "High" });
  if (reading.mercury > thresholds.mercury * 2) alerts.push({ metal: "Mercury", level: "Critical" });
  else if (reading.mercury > thresholds.mercury) alerts.push({ metal: "Mercury", level: "High" });
  if (reading.arsenic > thresholds.arsenic * 2) alerts.push({ metal: "Arsenic", level: "Critical" });
  else if (reading.arsenic > thresholds.arsenic) alerts.push({ metal: "Arsenic", level: "High" });
  return alerts;
}

function getRecommendation(reading) {
  if (!reading) return "No data available.";
  let rec = [];
  if (reading.lead > thresholds.lead) rec.push("Install reverse osmosis filtration for Lead removal");
  if (reading.mercury > thresholds.mercury) rec.push("Use activated carbon filters for Mercury contamination");
  if (reading.arsenic > thresholds.arsenic) rec.push("Implement advanced oxidation treatment for Arsenic");
  return rec.length === 0 ? "Water quality meets all safety standards. Safe for consumption." : rec.join(". ") + ".";
}

function getBarColor(value, metal) {
  if (value > thresholds[metal] * 2) return "#dc2626";
  if (value > thresholds[metal]) return "#f97316";
  return "#16a34a";
}

const wsiData = Object.fromEntries(
  Object.entries(mandalData).map(([mandal, reading]) => [mandal, calculateWSI(reading)])
);

export default function WaterQuality() {
  const [searchMandal, setSearchMandal] = useState("");
  const [filteredMandals, setFilteredMandals] = useState([]);

  const handleSearch = (value) => {
    setSearchMandal(value);
    if (value.length > 0) {
      const filtered = Object.keys(mandalData).filter(mandal =>
        mandal.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredMandals(filtered);
    } else {
      setFilteredMandals([]);
    }
  };

  const selectMandal = (mandal) => {
    setSearchMandal(mandal);
    setFilteredMandals([]);
  };

  const validMandal = mandalData[searchMandal] ? searchMandal : null;
  const reading = validMandal ? mandalData[searchMandal] : null;
  const wsi = validMandal ? wsiData[searchMandal] : 0;
  const alerts = getAlerts(reading);
  const recommendation = getRecommendation(reading);

  const history = [
    { day: "6 days ago", lead: 0.008, mercury: 0.002, arsenic: 0.009 },
    { day: "5 days ago", lead: 0.010, mercury: 0.003, arsenic: 0.010 },
    { day: "4 days ago", lead: 0.015, mercury: 0.004, arsenic: 0.015 },
    { day: "3 days ago", lead: 0.012, mercury: 0.003, arsenic: 0.012 },
    { day: "2 days ago", lead: 0.018, mercury: 0.005, arsenic: 0.018 },
    { day: "Yesterday", lead: 0.009, mercury: 0.002, arsenic: 0.010 },
    { day: "Today", lead: reading?.lead || 0, mercury: reading?.mercury || 0, arsenic: reading?.arsenic || 0 },
  ];

  const downloadReport = () => {
    if (!validMandal) {
      alert("Please select a valid Mandal first!");
      return;
    }

    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(`Water Quality Report - ${validMandal}`, 10, 20);
    doc.setFontSize(14);
    doc.text(`District: ${reading.district}`, 10, 30);
    doc.text(`Water Safety Index: ${wsi}%`, 10, 40);
    doc.text("Alerts:", 10, 55);
    if (alerts.length > 0) {
      alerts.forEach((a, i) => doc.text(`- ${a.metal} (${a.level})`, 15, 65 + i * 10));
    } else {
      doc.text("No alerts", 15, 65);
    }
    doc.text("Recommendations:", 10, 100);
    const recLines = doc.splitTextToSize(recommendation, 180);
    doc.text(recLines, 15, 110);
    doc.save(`Water_Quality_Report_${validMandal}.pdf`);
  };

  const getWSIColor = (wsi) => {
    if (wsi >= 80) return "text-green-600";
    if (wsi >= 50) return "text-yellow-600";
    return "text-red-600";
  };

  const getWSIBgColor = (wsi) => {
    if (wsi >= 80) return "bg-green-50 border-green-200";
    if (wsi >= 50) return "bg-yellow-50 border-yellow-200";
    return "bg-red-50 border-red-200";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br  p-6">
      <div className="max-w-7xl mx-auto space-y-6">

        <div className="grid md:grid-cols-2 gap-6">

          <div className="bg-white rounded-2xl  px-6 py-5 border border-blue-100">
            <h1 className="text-2xl font-bold text-blue-900 mb-2 flex items-center gap-3">
              <Droplet className="text-blue-600" size={26} />
              Water Quality Decision Support System
            </h1>
            <p className="text-blue-700">Groundwater Monitoring</p>
          </div>

          <div className="bg-white rounded-2xl  px-6 py-5 border border-blue-100">
            <div className="flex gap-4 items-start">
              <div className="flex-1 relative">
                <label className="text-blue-900 font-semibold mb-2 flex items-center gap-2">
                  <Search size={20} className="text-blue-600" />
                  Search Mandal
                </label>
                <input
                  type="text"
                  value={searchMandal}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Type mandal name (e.g., Visakhapatnam Rural)..."
                  className="w-full px-4 py-3 border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-900"
                />
                {filteredMandals.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white border-2 border-blue-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {filteredMandals.map((mandal, i) => (
                      <div
                        key={i}
                        onClick={() => selectMandal(mandal)}
                        className="px-4 py-2 hover:bg-blue-50 cursor-pointer text-blue-900 border-b border-blue-100"
                      >
                        <div className="font-medium">{mandal}</div>
                        <div className="text-sm text-blue-600">{mandalData[mandal].district} District</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <button
                onClick={downloadReport}
                className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition shadow-lg flex items-center gap-2"
              >
                <Download size={20} />
                Download Report
              </button>
            </div>
          </div>
        </div>

        {validMandal ? (
          <>
            {/* WSI Card */}
            <div className={`rounded-2xl shadow-xl py-3 px-7 border-2 ${getWSIBgColor(wsi)}`}>
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-blue-900 mb-2">Water Safety Index</h2>
                  <p className="text-blue-700">{validMandal}, {reading.district} District</p>
                </div>
                <div className="text-center">
                  <div className={`text-2xl font-bold ${getWSIColor(wsi)}`}>{wsi}%</div>
                  <p className="text-blue-700 font-medium mt-2">
                    {wsi >= 80 ? "Excellent" : wsi >= 50 ? "Moderate" : "Poor"}
                  </p>
                </div>
              </div>
            </div>

            {/* Current Readings and Recent History */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Current Readings */}
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-blue-100">
                <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
                  <TrendingUp className="text-blue-600" size={24} />
                  Current Readings
                </h3>
                <div className="space-y-4">
                  {["lead", "mercury", "arsenic"].map((metal) => (
                    <div key={metal}>
                      <div className="flex justify-between mb-1">
                        <span className="text-blue-900 font-medium capitalize">{metal}</span>
                        <span className="text-blue-700 font-semibold">{reading[metal]} mg/L</span>
                      </div>
                      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          style={{
                            width: `${Math.min((reading[metal] / (thresholds[metal] * 2)) * 100, 100)}%`,
                            backgroundColor: getBarColor(reading[metal], metal)
                          }}
                          className="h-full rounded-full transition-all duration-500"
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-blue-600 mt-1">
                        <span>Safe: ≤{thresholds[metal]}</span>
                        <span>Critical: ≥{thresholds[metal] * 2}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent History */}
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-blue-100">
                <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
                  <Calendar className="text-blue-600" size={24} />
                  Recent Readings
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b-2 border-blue-200">
                        <th className="text-left py-2 text-blue-900 font-semibold">Day</th>
                        <th className="text-right py-2 text-blue-900 font-semibold">Lead</th>
                        <th className="text-right py-2 text-blue-900 font-semibold">Hg</th>
                        <th className="text-right py-2 text-blue-900 font-semibold">As</th>
                      </tr>
                    </thead>
                    <tbody>
                      {history.map((h, i) => (
                        <tr key={i} className="border-b border-blue-100">
                          <td className="py-2 text-blue-700">{h.day}</td>
                          <td className="text-right py-2 text-blue-900">{h.lead}</td>
                          <td className="text-right py-2 text-blue-900">{h.mercury}</td>
                          <td className="text-right py-2 text-blue-900">{h.arsenic}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Alerts and Recommendations */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Alerts */}
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-blue-100">
                <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
                  <AlertTriangle className="text-orange-600" size={24} />
                  Alerts
                </h3>
                {alerts.length > 0 ? (
                  <div className="space-y-2">
                    {alerts.map((a, i) => (
                      <div
                        key={i}
                        className={`p-3 rounded-lg border-l-4 ${a.level === "Critical"
                            ? "bg-red-50 border-red-500"
                            : "bg-orange-50 border-orange-500"
                          }`}
                      >
                        <div className="flex items-center gap-2">
                          <AlertTriangle size={18} className={a.level === "Critical" ? "text-red-600" : "text-orange-600"} />
                          <span className="font-semibold text-blue-900">{a.metal}</span>
                          <span className={`text-sm px-2 py-1 rounded ${a.level === "Critical"
                              ? "bg-red-200 text-red-800"
                              : "bg-orange-200 text-orange-800"
                            }`}>
                            {a.level}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                    <p className="text-green-800 font-medium">✓ No alerts. Water quality is within safe limits.</p>
                  </div>
                )}
              </div>

              {/* Recommendations */}
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-blue-100">
                <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
                  <Lightbulb className="text-yellow-600" size={24} />
                  Recommendations
                </h3>
                <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                  <p className="text-blue-900 leading-relaxed">{recommendation}</p>
                </div>
              </div>
            </div>

            {/* Mandal Ranking */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-blue-100">
              <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
                <Award className="text-yellow-600" size={24} />
                Mandal Water Safety Ranking
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.keys(wsiData)
                  .sort((a, b) => wsiData[b] - wsiData[a])
                  .map((mandal, i) => (
                    <div
                      key={i}
                      className={`p-4 rounded-lg border-2 ${wsiData[mandal] >= 80
                          ? "bg-green-50 border-green-200"
                          : wsiData[mandal] >= 50
                            ? "bg-yellow-50 border-yellow-200"
                            : "bg-red-50 border-red-200"
                        }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-semibold text-blue-900">{mandal}</p>
                          <p className="text-sm text-blue-600">{mandalData[mandal].district}</p>
                        </div>
                        <div className={`text-2xl font-bold ${wsiData[mandal] >= 80
                            ? "text-green-600"
                            : wsiData[mandal] >= 50
                              ? "text-yellow-600"
                              : "text-red-600"
                          }`}>
                          {wsiData[mandal]}%
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Safety Tips */}
            <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl shadow-xl p-6 text-white">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Lightbulb size={24} />
                Tips for Safe Water
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0">
                    ✓
                  </div>
                  <p>Use water filters certified for heavy metal removal</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0">
                    ✓
                  </div>
                  <p>Boil water for at least 5 minutes before consumption</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0">
                    ✓
                  </div>
                  <p>Report unusual color, taste, or odor immediately</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0">
                    ✓
                  </div>
                  <p>Schedule regular water quality testing every 6 months</p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl p-12 border border-blue-100 text-center">
            <Droplet size={64} className="text-blue-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-blue-900 mb-2">Select a Mandal</h3>
            <p className="text-blue-700">Search and select a mandal to view water quality data</p>
          </div>
        )}
      </div>
    </div>
  );
}