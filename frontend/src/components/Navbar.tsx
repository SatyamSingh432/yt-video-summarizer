import React from "react";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  return (
    <nav className="w-full bg-white border-b border-gray-200 shadow-sm px-4 py-3 flex items-center justify-between">
      <h1 className="text-lg font-semibold text-gray-800">
        Video Insight Summarizer
      </h1>
      {user && (
        <button
          onClick={logout}
          className="px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Logout
        </button>
      )}
    </nav>
  );
}
