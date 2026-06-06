import { useEffect, useState } from "react";
import api from "../../services/api";
import Header from "../admin/components/Header";
import Sidebar from "../admin/components/Sidebar";
import StatCard from "../admin/components/StatCard";
import OrdersTable from "./components/OrdersTable";

const ownerLinks = [
  { to: "/admin/dashboard", label: "Admin Dashboard" },
  { to: "/owner/dashboard", label: "Owner Dashboard" },
  { to: "/stores", label: "Stores" },
];

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalSales: 0,
    averageRating: 0,
    recentOrders: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/owner/dashboard")
      .then((res) => {
        setStats(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <Sidebar links={ownerLinks} />
      <div style={{ marginLeft: 220, padding: "1rem", flex: 1 }}>
        <Header title="Owner Dashboard" />
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <StatCard title="Total Sales" value={`$${stats.totalSales}`} />
              <StatCard title="Avg Rating" value={stats.averageRating} />
            </div>
            <OrdersTable orders={stats.recentOrders} />
          </>
        )}
      </div>
    </div>
  );
}
