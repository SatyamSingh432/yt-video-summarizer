import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { api } from "../lib/api.ts";
import { useAuth } from "../context/AuthContext.tsx";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthToken, setUser, getUserData } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const res = await api.post("/auth/signup", { email, password });
      if (res.data) {
        setAuthToken(res.data.token);
        const userData = await getUserData(res.data.token);
        setUser(userData);
        navigate("/");
      }
    } catch (err) {
      alert("Signup failed");
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
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
      <button onClick={handleSignup}>Sign Up</button>
    </div>
  );
}
