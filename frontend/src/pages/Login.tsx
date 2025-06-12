import { useState } from "react";
import { api } from "../lib/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.tsx";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthToken, setUser, getUserData } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await api.post("/auth/login", { email, password });
      if (res.data) {
        setAuthToken(res.data.token);
        const userData = await getUserData(res.data.token);
        setUser(userData);
        navigate("/");
      }
    } catch (error) {
      console.log("Error");
    }
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md space-y-6">
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Login
        </h2>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleLogin}
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Login
        </button>
        <button
          onClick={handleSignup}
          className="w-full py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}
