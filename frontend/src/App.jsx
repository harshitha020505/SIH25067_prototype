import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import HmpiMap from "./pages/HmpiMap";
import OfficeDashboard from "./pages/OfficeDashboard";
import Login from "./pages/Login";
import Calculation from "./components/Calculation";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/hmpi_map" element={<HmpiMap />} />

        {/* Dynamic role route */}
        <Route path="/dashboard/:role" element={<OfficeDashboard />} />
        <Route path="/hmpi_info" element={<Calculation />} />
      </Routes>
    </Router>
  );
}
