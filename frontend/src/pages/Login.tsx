import React, { useState } from "react";
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
    <div>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleLogin}>Login</button>

      <button onClick={handleSignup}>Sign Up</button>
    </div>
  );
}
