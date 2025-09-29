import React, { useState } from "react";
import { User, Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Mock email login
  const handleEmailLogin = async () => {
    if (!role) {
      alert("Please select your role to continue");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      navigate(`/dashboard/${role.replace(/\s+/g, "-").toLowerCase()}`, {
        state: { user: { email, role } },
      });
      setIsLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      {/* Light gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #f9fafb 0%, #e0f2fe 60%, #fef9c3 100%)",
          filter: "blur(80px)",
          transform: "scale(1.2)",
        }}
      ></div>

      {/* Login card */}
      <div className="relative w-full max-w-md bg-white/90 backdrop-blur-lg shadow-xl rounded-2xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Login</h2>
        </div>

        <div className="space-y-4">
          {/* Email */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-blue-400" />
            </div>
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 bg-gray-50 focus:bg-white"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-blue-400" />
            </div>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 bg-gray-50 focus:bg-white"
            />
          </div>

          {/* Role */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-blue-400" />
            </div>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 bg-gray-50 focus:bg-white appearance-none cursor-pointer"
            >
              <option value="">Select Your Role</option>
              <option value="Field-Officer">Field Officer</option>
              <option value="Quality-Inspector">Quality Inspector</option>
            </select>
          </div>

          {/* Login button */}
          <button
            onClick={handleEmailLogin}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-400 to-blue-500 text-white font-semibold py-3 px-6 rounded-xl transition-all transform hover:scale-105 disabled:opacity-50 shadow-lg"
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={() => (window.location.href = "/")}
            className="border p-2 rounded-lg w-full bg-gray-700 text-white hover:bg-gray-800"
          >
            Return Home
          </button>
        </div>
      </div>
    </div>
  );
}
