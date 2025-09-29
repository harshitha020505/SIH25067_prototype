import React, { useState, useEffect } from "react";
import { User, Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Mock authentication functions
  const mockSignInWithEmailAndPassword = async (email, password) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ user: { email, displayName: email.split("@")[0] } });
      }, 1500);
    });
  };

  const mockSignInWithPopup = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ user: { email: "user@company.com", displayName: "John Doe" } });
      }, 1500);
    });
  };

  const mockSignOut = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 500);
    });
  };

  useEffect(() => {
    mockSignOut().catch(console.error);
  }, []);

  const handleEmailLogin = async () => {
    if (!role) {
      alert("Please select your role to continue");
      return;
    }

    setIsLoading(true);
    try {
      const userCredential = await mockSignInWithEmailAndPassword(email, password);
      const loggedInUser = { ...userCredential.user, role };
      setUser(loggedInUser);

      navigate(`/dashboard/${role.replace(/\s+/g, "-").toLowerCase()}`, {
        state: { user: loggedInUser },
      });
    } catch (error) {
      alert("Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    if (!role) {
      alert("Please select your role to continue");
      return;
    }

    setIsLoading(true);
    try {
      const result = await mockSignInWithPopup();
      setUser({ ...result.user, role });
      navigate(`/dashboard/${role.replace(/\s+/g, "-").toLowerCase()}`, {
        state: { user: { ...result.user, role } },
      });
    } catch (error) {
      alert("Google login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Side with Background */}
      <div className="hidden lg:flex lg:w-[70vw] relative overflow-hidden">
        <div
          className="absolute h-screen w-full inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url("https://lh4.googleusercontent.com/proxy/nxHfZrUb1GaXJa7GdI4WPwzmAksvdiGNLzlGsN7OVkjt1v2hGCtLTXaUZef_oTWIDWYsef16g9HEYww")`,
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-br bg-black/40"></div>
        <div className="relative z-10 flex flex-col justify-center items-center text-center p-10">
          <h1 className="text-4xl font-bold text-white mb-4">
            Groundwater Monitoring Portal
          </h1>
          <p className="text-lg text-blue-100 max-w-md">
            Access water quality data, update field reports, and ensure safe
            groundwater management with role-based login.
          </p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Login</h2>
          </div>

          <div className="space-y-4">
            {/* Email Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-blue-400" />
              </div>
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 bg-gray-50 focus:bg-white"
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-blue-400" />
              </div>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 bg-gray-50 focus:bg-white"
              />
            </div>

            {/* Role Selection */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-blue-400" />
              </div>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 bg-gray-50 focus:bg-white appearance-none cursor-pointer"
              >
                <option value="">Select Your Role</option>
                <option value="Field-Officer">Field Officer</option>
                <option value="Quality-Inspector">Quality Inspector</option>
              </select>
            </div>

            {/* Email Login Button */}
            <button
              onClick={handleEmailLogin}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-3 px-6 rounded-xl transition-all transform hover:scale-105 disabled:opacity-50 shadow-lg"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Signing In...
                </div>
              ) : (
                "Sign In with Email"
              )}
            </button>

            {/* Divider */}
            <div className="relative flex items-center justify-center my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative bg-white px-4">
                <span className="text-sm text-gray-500 font-medium">OR</span>
              </div>
            </div>

            {/* Google Login Button */}
            <button
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="w-full bg-white border-2 border-gray-300 hover:border-blue-300 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-all transform hover:scale-105 disabled:opacity-50 shadow-md flex items-center justify-center"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500 mr-2"></div>
                  Connecting...
                </div>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Continue with Google
                </>
              )}
            </button>
          </div>

          {/* Footer */}
          <div className="text-center mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={() => {
                window.location.href = "/";
              }}
              className="border p-2 rounded-lg w-full bg-black text-white"
            >
              Return Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
