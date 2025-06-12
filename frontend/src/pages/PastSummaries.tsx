import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { api } from "../lib/api";

export type Summary = {
  _id: string;
  user: string;
  title: string;
  text: string;
  createdAt: string;
  updatedAt?: string;
};

export default function PastSummaries() {
  const { token } = useAuth();
  const [summaries, setSummaries] = useState<Summary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummaries = async () => {
      try {
        const res = await api.get("/user/past-summaries", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSummaries(res.data);
      } catch (err) {
        console.error("Error loading summaries", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSummaries();
  }, [token]);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Your Past Summaries
      </h2>
      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : summaries.length === 0 ? (
        <p className="text-gray-600">No summaries found.</p>
      ) : (
        <div className="space-y-4">
          {summaries.map((summary) => (
            <div key={summary?._id} className="bg-white p-4 rounded-lg shadow">
              <h4 className="font-medium text-gray-900 mb-1">
                {summary?.title}
              </h4>
              <p className="text-sm text-gray-700 whitespace-pre-line">
                {summary?.text}
              </p>
              <p className="text-xs text-gray-400 mt-2">
                {new Date(summary?.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
