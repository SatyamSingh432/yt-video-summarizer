import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";

import Navbar from "./components/Navbar";
import PastSummaries from "./pages/PastSummaries";
import AdminDashboard from "./pages/AdminDashboard";

const App = () => (
  <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/past-summaries" element={<PastSummaries />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  </>
);

export default App;
