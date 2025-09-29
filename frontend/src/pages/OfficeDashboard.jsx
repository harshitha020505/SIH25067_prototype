import React, { useState, useEffect } from "react";
import { Map, BarChart3, Bell, HelpCircle, Upload, Database, X, FileText, Activity, Droplet, LogOut } from "lucide-react";
import NavBar from "./Dashboard/NavBar";
import DSS from "./Dashboard/DSS";
import HMPI from "./Dashboard/HMPI";
import Forecast from "./Dashboard/Forecast";
import Reports from "./Dashboard/Reports";
import Alerts from "./Dashboard/Alerts";
import Help from "./Dashboard/Help";
import Maps from "./Dashboard/Maps";
import UploadFile from "./Dashboard/Upload";
import { useParams, useLocation, useNavigate } from "react-router-dom";

export default function OfficeDashboard() {
  const [activeTab, setActiveTab] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedMandal, setSelectedMandal] = useState("");
  const [showLocationModal, setShowLocationModal] = useState(false);

  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [mandals, setMandals] = useState([]);

  let { role } = useParams();
  const navigate = useNavigate();
  role = role === "quality-inspector" ? "Quality Inspector" : "Field Officer";
  useEffect(() => {
    setActiveTab(role === "Quality Inspector" ? "maps" : "upload");
  }, [role]);


  const location = useLocation();
  const user = location.state?.user;


  const handleLogout = () => navigate("/admin/login");


  useEffect(() => {
    fetch("/india_states.geojson")
      .then(res => res.json())
      .then(data => {
        const stateList = data.features.map(f => f.properties.NAME_1);
        setStates([...new Set(stateList)]);
      });

    fetch("/india_districts.geojson")
      .then(res => res.json())
      .then(data => setDistricts(data.features));

    fetch("/india_mandals.geojson")
      .then(res => res.json())
      .then(data => setMandals(data.features));
  }, []);

  const filteredDistricts = districts
    .filter(d => d.properties.NAME_1 === selectedState)
    .map(d => d.properties.NAME_2);

  const filteredMandals = mandals
    .filter(m => m.properties.NAME_2 === selectedDistrict)
    .map(m => m.properties.NAME_3);

  const heavyMetals = [{ name: "Arsenic (As)", limit: 0.01, unit: "mg/L", current: 0.008, status: "safe" }, { name: "Lead (Pb)", limit: 0.01, unit: "mg/L", current: 0.015, status: "warning" }, { name: "Cadmium (Cd)", limit: 0.003, unit: "mg/L", current: 0.002, status: "safe" }, { name: "Mercury (Hg)", limit: 0.001, unit: "mg/L", current: 0.0005, status: "safe" }, { name: "Chromium (Cr)", limit: 0.05, unit: "mg/L", current: 0.055, status: "danger" }, { name: "Nickel (Ni)", limit: 0.02, unit: "mg/L", current: 0.012, status: "safe" }];

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
              {states.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
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
                {filteredDistricts.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
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
                {filteredMandals.map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
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

  const navItems = [
    { id: "maps", label: "Maps", icon: <Map size={18} />, roles: ["Quality Inspector"] },
    { id: "dss", label: "DSS", icon: <Database size={18} />, roles: ["Quality Inspector"] },
    { id: "hmpi", label: "HMPI", icon: <Activity size={18} />, roles: ["Quality Inspector"] },
    { id: "forecast", label: "Forecast", icon: <BarChart3 size={18} />, roles: ["Quality Inspector"] },
    { id: "reports", label: "Reports", icon: <FileText size={18} />, roles: ["Quality Inspector"] },
    { id: "upload", label: "Upload", icon: <Upload size={18} />, roles: ["Field Officer"] },
    { id: "alerts", label: "Alerts", icon: <Bell size={18} />, roles: ["Field Officer", "Quality Inspector"] },

  ];

  const allowedNav = navItems.filter((item) => item.roles.includes(role));

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Navbar remains same */}
      <header className="sticky top-2 mx-2 rounded-xl border-1 left-0 right-0 z-50 bg-white/70 backdrop-blur-lg shadow-md shadow-blue-400 border-b border-blue-400">
        <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-blue-800">HMPI Dashboard</h1>
            <p className="text-xs text-blue-600">Heavy Metal Pollution Index Monitoring</p>
          </div>

          <div className="flex items-center space-x-3">
            <Droplet className="text-blue-500" size={20} />
            <div className="text-sm">
              <p className="text-gray-500 font-medium">Location</p>
              <p className="text-blue-800 font-semibold">{getLocationString()}</p>
            </div>
            <button
              onClick={() => setShowLocationModal(true)}
              className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white font-semibold shadow-lg hover:rounded-3xl hover:shadow-xl transition-all duration-300"
            >
              Change
            </button>
          </div>

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


      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto pb-32">
        {activeTab === "maps" && (
          <Maps
            getLocationString={getLocationString}
            selectedState={selectedState}
            selectedDistrict={selectedDistrict}
            selectedMandal={selectedMandal}
          />
        )}
        {activeTab === "dss" && <DSS />}
        {activeTab === "hmpi" && <HMPI heavyMetals={heavyMetals} />}
        {activeTab === "forecast" && <Forecast />}
        {activeTab === "reports" && <Reports />}
        {activeTab === "alerts" && <Alerts />}
        {activeTab === "upload" && <UploadFile />}
      </main>

      <NavBar allowedNav={allowedNav} activeTab={activeTab} setActiveTab={setActiveTab} role={role} />
      {showLocationModal && <LocationModal />}
    </div>
  );
}
