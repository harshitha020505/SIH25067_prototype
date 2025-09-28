import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landingPage";
import HmpiMap from "./pages/HmpiMap";
import OfficeDashboard from "./pages/officeDashboard";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/hmpi_map" element={<HmpiMap />} />
        <Route path="/dashboard" element={<OfficeDashboard />} />
      </Routes>
    </Router>
  );
}
