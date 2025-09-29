import React, { useState } from "react";
import { Map, BarChart3, Bell, HelpCircle, Upload, Database, ChevronDown, X, FileText, Activity, Droplet, AlertTriangle } from "lucide-react";
import NavBar from "./Dashboard/NavBar";
import DSS from "./Dashboard/DSS";
import HMPI from "./Dashboard/HMPI";
import Forecast from "./Dashboard/Forecast";
import Reports from "./Dashboard/Reports";
import Alerts from "./Dashboard/Alerts";
import Help from "./Dashboard/Help";
import Maps from "./Dashboard/Maps";
import { useParams, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

export default function OfficeDashboard() {
  const [activeTab, setActiveTab] = useState("maps");
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedMandal, setSelectedMandal] = useState("");
  const [showLocationModal, setShowLocationModal] = useState(false);
  let { role } = useParams(); 
  const navigate = useNavigate();

  role = role == 'quality-inspector' ? 'Quality Inspector' : 'Field Officer';
  const location = useLocation();
  const user = location.state?.user;

  const handleLogout = () => {
    navigate("/admin/login");
  };

  // Sample data - in real app, this would come from API
  const states = ["Andhra Pradesh", "Telangana", "Karnataka", "Tamil Nadu", "Maharashtra"];
  const districts = {
    "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Tirupati"],
    "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Khammam"],
    "Karnataka": ["Bangalore", "Mysore", "Mangalore", "Hubli"],
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Salem"],
    "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik"]
  };
  const mandals = ["Mandal 1", "Mandal 2", "Mandal 3", "Mandal 4", "Mandal 5"];

  const navItems = [
    { id: "maps", label: "Maps", icon: <Map size={18} />, roles: ["Field Officer", "Quality Inspector"] },
    { id: "dss", label: "DSS", icon: <Database size={18} />, roles: ["Quality Inspector"] },
    { id: "hmpi", label: "HMPI", icon: <Activity size={18} />, roles: ["Quality Inspector"] },
    { id: "forecast", label: "Forecast", icon: <BarChart3 size={18} />, roles: ["Quality Inspector"] },
    { id: "reports", label: "Reports", icon: <FileText size={18} />, roles: ["Quality Inspector"] },
    { id: "alerts", label: "Alerts", icon: <Bell size={18} />, roles: ["Field Officer", "Quality Inspector"] },
    { id: "upload", label: "Upload", icon: <Upload size={18} />, roles: ["Field Officer"] },
    { id: "help", label: "Help", icon: <HelpCircle size={18} />, roles: ["Field Officer", "Quality Inspector"] },
  ];

  const allowedNav = navItems.filter((item) => item.roles.includes(role));

  const heavyMetals = [
    { name: "Arsenic (As)", limit: 0.01, unit: "mg/L", current: 0.008, status: "safe" },
    { name: "Lead (Pb)", limit: 0.01, unit: "mg/L", current: 0.015, status: "warning" },
    { name: "Cadmium (Cd)", limit: 0.003, unit: "mg/L", current: 0.002, status: "safe" },
    { name: "Mercury (Hg)", limit: 0.001, unit: "mg/L", current: 0.0005, status: "safe" },
    { name: "Chromium (Cr)", limit: 0.05, unit: "mg/L", current: 0.055, status: "danger" },
    { name: "Nickel (Ni)", limit: 0.02, unit: "mg/L", current: 0.012, status: "safe" }
  ];

  const LocationModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 flex justify-between items-center">
          <h3 className="text-2xl font-bold text-white">Select Location</h3>
          <button onClick={() => setShowLocationModal(false)} className="text-white hover:bg-blue-700 rounded-full p-2 transition">
            <X size={24} />
          </button>
        </div>
        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-blue-900 mb-2">State</label>
            <select
              value={selectedState}
              onChange={(e) => {
                setSelectedState(e.target.value);
                setSelectedDistrict("");
                setSelectedMandal("");
              }}
              className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:outline-none focus:border-blue-500 transition"
            >
              <option value="">-- Select State --</option>
              {states.map(state => <option key={state} value={state}>{state}</option>)}
            </select>
          </div>

          {selectedState && (
            <div>
              <label className="block text-sm font-semibold text-blue-900 mb-2">District</label>
              <select
                value={selectedDistrict}
                onChange={(e) => {
                  setSelectedDistrict(e.target.value);
                  setSelectedMandal("");
                }}
                className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:outline-none focus:border-blue-500 transition"
              >
                <option value="">-- Select District --</option>
                {districts[selectedState]?.map(district => <option key={district} value={district}>{district}</option>)}
              </select>
            </div>
          )}

          {selectedDistrict && (
            <div>
              <label className="block text-sm font-semibold text-blue-900 mb-2">Mandal / Tehsil</label>
              <select
                value={selectedMandal}
                onChange={(e) => setSelectedMandal(e.target.value)}
                className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:outline-none focus:border-blue-500 transition"
              >
                <option value="">-- Select Mandal --</option>
                {mandals.map(mandal => <option key={mandal} value={mandal}>{mandal}</option>)}
              </select>
            </div>
          )}

          <button
            onClick={() => setShowLocationModal(false)}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition shadow-lg"
          >
            Apply Selection
          </button>
        </div>
      </div>
    </div>
  );

  const getLocationString = () => {
    if (!selectedState) return "No location selected";
    let location = selectedState;
    if (selectedDistrict) location += ` > ${selectedDistrict}`;
    if (selectedMandal) location += ` > ${selectedMandal}`;
    return location;
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">

      {/* Floating Sticky Navbar */}
      <header className="fixed top-0 mx-2 mt-2 rounded-xl border-1  left-0 right-0 z-50 bg-white/70 backdrop-blur-lg shadow-md shadow-blue-400 border-b border-blue-400 ">
        <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">

          {/* Logo + Title */}
          <div>
            <h1 className="text-xl font-bold text-blue-800">HMPI Dashboard</h1>
            <p className="text-xs text-blue-600">Heavy Metal Pollution Index Monitoring</p>
          </div>

          {/* Location Display */}
          <div className="flex items-center space-x-3">
            <Droplet className="text-blue-500" size={20} />
            <div className="text-sm">
              <p className="text-gray-500 font-medium">Location</p>
              <p className="text-blue-800 font-semibold">{getLocationString()}</p>
            </div>
            <button
              onClick={() => setShowLocationModal(true)}
              className="ml-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition shadow"
            >
              Change
            </button>
          </div>

          {/* Role & Logout */}
          <div className="flex items-center space-x-4">
            <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg text-sm font-semibold shadow">
              {role}
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-white font-semibold shadow transition"
            >
              <LogOut className="mr-2" size={16} /> Logout
            </button>
          </div>
        </div>
      </header>

      {/* Add padding so content doesn't hide behind navbar */}
      <div className="pt-24"></div>


      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto pb-32">

        {activeTab === "maps" && (
          <Maps getLocationString={getLocationString} />
        )}

        {activeTab === "dss" && (
          <DSS />
        )}

        {activeTab === "hmpi" && (
          <HMPI heavyMetals={heavyMetals} />
        )}

        {activeTab === "forecast" && (
          <Forecast />
        )}

        {activeTab === "reports" && (
          <Reports />
        )}

        {activeTab === "alerts" && (
          <Alerts />
        )}

        {activeTab === "upload" && (
          <Upload />
        )}

        {activeTab === "help" && (
          <Help />
        )}
      </main>
      <NavBar allowedNav={allowedNav} activeTab={activeTab} setActiveTab={setActiveTab} role={role} />

      {showLocationModal && <LocationModal />}
    </div>
  );
}