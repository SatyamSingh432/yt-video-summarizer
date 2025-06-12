import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { api } from "../lib/api";

export default function AdminDashboard() {
  const { token } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get("/user/all-users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data);
      } catch (err) {
        console.error("Failed to load admin data");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [token]);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Admin Panel
        </h2>
        {loading ? (
          <div className="flex justify-center">
            <div className="w-6 h-6 border-4 border-blue-300 border-t-blue-600 rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left text-sm font-medium text-gray-700 px-4 py-2">
                    Email
                  </th>
                  <th className="text-left text-sm font-medium text-gray-700 px-4 py-2">
                    Role
                  </th>
                  <th className="text-left text-sm font-medium text-gray-700 px-4 py-2">
                    Usage Count
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="border-t text-sm text-gray-800">
                    <td className="px-4 py-2">{user.email}</td>
                    <td className="px-4 py-2 capitalize">{user.role}</td>
                    <td className="px-4 py-2">{user.usageCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
