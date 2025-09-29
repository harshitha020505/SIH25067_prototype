import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landingPage";
import HmpiMap from "./pages/HmpiMap";
import OfficeDashboard from "./pages/officeDashboard";
import Login from "./pages/Login";
import Button12 from "./components/Button12";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/hmpi_map" element={<HmpiMap />} />

        {/* Dynamic role route */}
        <Route path="/dashboard/:role" element={<OfficeDashboard />} />
        <Route path="/1" element={<Button12 />} />

      </Routes>
    </Router>
  );
}
