import React from "react";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  return (
    <nav>
      <h1>Video Insight Summarizer</h1>
      {user && <button onClick={logout}>Logout</button>}
    </nav>
  );
}
