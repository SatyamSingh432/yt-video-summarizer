import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { user, logout } = useAuth();
  return (
    <nav className="w-full bg-white border-b border-gray-200 shadow-sm px-4 py-3 flex items-center justify-between">
      <h1 className="text-lg font-semibold text-gray-800">
        Video Insight Summarizer
      </h1>
      {user && (
        <div className="flex items-center gap-3">
          {user?.role === "admin" && (
            <Link
              to="/admin"
              className="px-4 py-2 text-sm text-white bg-gray-800 rounded-lg hover:bg-gray-900 transition-colors"
            >
              Admin Dashboard
            </Link>
          )}
          <Link
            to="/past-summaries"
            className="px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Past Summaries
          </Link>
          <button
            onClick={logout}
            className="px-4 py-2 text-sm text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
