import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const API_BASE = "http://localhost:5000/api/admin";
const COLORS = ["#6c63ff", "#59aaf8", "#ffb84d", "#ff7d95", "#ff4d6d"];

export default function DistributionChart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE}/dashboard`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch distribution data");
      const json = await res.json();
      const chartData = json.ratingDistribution
        .sort((a, b) => b.rating - a.rating)
        .map(d => ({ name: `${d.rating}★`, value: d.count }));
      setData(chartData);
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

  if (loading) return <div style={{ padding: "20px" }}>Loading distribution chart…</div>;
  if (error) return <div style={{ color: "red", padding: "20px" }}>Error: {error}</div>;

  return (
    <div
      style={{
        background: "#fff",
        padding: "25px",
        borderRadius: "24px",
      }}
    >
      <h3>Ratings Distribution</h3>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={data} innerRadius={70} outerRadius={100} dataKey="value">
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
