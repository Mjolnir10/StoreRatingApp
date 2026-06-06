import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const API_BASE = "http://localhost:5000/api/admin";

export default function RatingsChart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE}/dashboard`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch rating data");
      const json = await res.json();
      // Transform distribution into line chart data (rating vs count)
      const lineData = json.ratingDistribution
        .sort((a, b) => b.rating - a.rating) // highest rating first
        .map(d => ({ rating: `${d.rating}★`, count: d.count }));
      setData(lineData);
    } catch (e) {
      console.error(e);
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <div style={{ padding: "20px" }}>Loading ratings chart…</div>;
  if (error) return <div style={{ color: "red", padding: "20px" }}>Error: {error}</div>;

  return (
    <div
      style={{
        background: "#fff",
        padding: "25px",
        borderRadius: "24px",
      }}
    >
      <h3>Ratings Distribution (Line)</h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="rating" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#6c63ff"
            strokeWidth={4}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
