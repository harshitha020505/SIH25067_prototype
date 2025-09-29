import React, { useState } from "react";
import { Bell, Send, CheckCircle, XCircle } from "lucide-react";

export default function Alerts() {
  // Refactored state to match the data needed for the HPI alert endpoint
  const [siteName, setSiteName] = useState("");
  const [hpiValue, setHpiValue] = useState(""); // Stores the HPI value (e.g., 160.99)
  const [status, setStatus] = useState("");
  const [isSending, setIsSending] = useState(false);

  // Example list of sites to choose from
  const siteOptions = ["Mumbai", "Hyderabad", "Kolkata", "Delhi", "Chennai"];

  const sendHPIAlert = async () => {
    if (!siteName || !hpiValue) {
      setStatus("❌ Please select a Site Name and enter an HPI Value.");
      return;
    }

    setIsSending(true);
    setStatus("⏳ Dispatching alert...");

    try {
      const response = await fetch("http://localhost:5174/send_alert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          site_name: siteName,
          hpi_value: parseFloat(hpiValue),
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus(`✅ SMS alert sent successfully for ${siteName}! SID: ${data.alert_sid}`);
        setSiteName("");
        setHpiValue("");
      } else {
        setStatus("❌ Error: " + data.message);
      }
    } catch (error) {
      setStatus("❌ Failed to connect to backend. Check console/server status.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-xl p-6 border border-blue-100">
        <h2 className="text-2xl font-bold text-blue-900 mb-4 flex items-center">
          <Bell className="mr-3 text-blue-600" size={28} />
          SMS Alert Management (HPI-Based)
        </h2>
        <p className="text-blue-700 mb-6">
          Test and configure critical alerts triggered by the Heavy Metal Pollution Index (HPI).
        </p>

        {/* Recent Alerts (Dummy Data) */}
        <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-200 mb-6">
          <h3 className="font-semibold text-blue-900 mb-4">Recent Alerts (Dummy Data)</h3>
          <div className="space-y-3">
            {[
              { type: "Critical", message: "Chromium levels exceeded in Zone A", time: "2 hours ago" },
              { type: "Warning", message: "Lead concentration approaching limit", time: "5 hours ago" },
              { type: "Info", message: "Monthly report ready for review", time: "1 day ago" },
            ].map((alert, idx) => (
              <div
                key={idx}
                className={`bg-white p-4 rounded-lg border-l-4 ${
                  alert.type === "Critical"
                    ? "border-red-500"
                    : alert.type === "Warning"
                    ? "border-yellow-500"
                    : "border-blue-500"
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span
                      className={`text-xs font-bold px-2 py-1 rounded ${
                        alert.type === "Critical"
                          ? "bg-red-200 text-red-800"
                          : alert.type === "Warning"
                          ? "bg-yellow-200 text-yellow-800"
                          : "bg-blue-200 text-blue-800"
                      }`}
                    >
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

        {/* Manual HPI Alert Sender */}
        <div className="bg-white p-6 rounded-xl border border-blue-200 shadow-md mb-6">
          <h3 className="font-semibold text-blue-900 mb-4">Manual HPI Alert Trigger</h3>

          <label className="block text-sm font-medium text-gray-700 mb-1">Target Site</label>
          <select
            value={siteName}
            onChange={(e) => setSiteName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-3 bg-white appearance-none"
          >
            <option value="" disabled>
              Select a location (Must be in backend map)
            </option>
            {siteOptions.map((site) => (
              <option key={site} value={site}>
                {site}
              </option>
            ))}
          </select>

          <label className="block text-sm font-medium text-gray-700 mb-1">
            HPI Value (e.g., 160.99 for Critical)
          </label>
          <input
            type="number"
            step="0.01"
            placeholder="Enter HPI value (> 150 for Critical)"
            value={hpiValue}
            onChange={(e) => setHpiValue(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />

          <button
            onClick={sendHPIAlert}
            disabled={isSending || !siteName || !hpiValue}
            className="px-3 mx-auto bg-gradient-to-r from-red-600 to-red-700 text-white py-2 rounded-lg font-semibold 
                       hover:from-red-700  hover:to-red-800 transition disabled:bg-gray-400 disabled:from-gray-400 disabled:to-gray-500
                       flex items-center "
          >
            {isSending ? (
              <span className="flex items-center">
                <span className="animate-spin mr-2">⚙️</span> Sending Alert...
              </span>
            ) : (
              <span className="flex items-center">
                <Send size={18} className="mr-2" /> Trigger HPI Alert
              </span>
            )}
          </button>

          {status && (
            <p
              className={`mt-3 text-sm flex items-center ${
                status.startsWith("✅") ? "text-green-700" : "text-red-700"
              }`}
            >
              {status.startsWith("✅") ? (
                <CheckCircle size={16} className="mr-2" />
              ) : (
                <XCircle size={16} className="mr-2" />
              )}
              {status}
            </p>
          )}
        </div>

      </div>
    </div>
  );
}