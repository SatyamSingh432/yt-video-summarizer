import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import PastSummaries from "./pages/PastSummaries";
import AdminDashboard from "./pages/AdminDashboard";
import type { ReactElement } from "react";

function AdminRoute({ children }: { children: ReactElement }) {
  const { user } = useAuth();
  return user && user.role === "admin" ? children : <Navigate to="/" />;
}

const App = () => (
  <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/past-summaries" element={<PastSummaries />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />
    </Routes>
  </>
);

export default App;
