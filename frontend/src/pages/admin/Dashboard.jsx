import { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";

import Header from "../admin/components/Header";
import Sidebar from "../admin/components/Sidebar";
import StatCard from "../admin/components/StatCard";
import RatingsChart from "../admin/components/RatingsChart";
import DistributionChart from "../admin/components/DistributionChart";
import RecentUsersTable from "../admin/components/RecentUsersTable";
import RecentStoresTable from "../admin/components/RecentStoresTable";

import { FaUsers, FaStore, FaStar, FaChartLine } from "react-icons/fa";

const API_BASE = "http://localhost:5000/api/admin";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalUsers: "-",
    totalStores: "-",
    totalRatings: "-",
    averageRating: "-",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE}/dashboard`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to fetch dashboard stats");
      const data = await res.json();
      setStats({
        totalUsers: data.totalUsers,
        totalStores: data.totalStores,
        totalRatings: data.totalRatings,
        averageRating: data.averageRating,
        recentUsers: (data.recentUsers || []).map((u) => ({
          name: u.name,
          email: u.email,
          role: u.role,
          status: "Active",
        })),
        recentStores: (data.recentStores || []).map((s) => ({
          id: s.id,
          name: s.name,
          address: s.address,
          createdAt: s.created_at || s.createdAt,
        })),
      });
    } catch (e) {
      console.error(e);
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) return <div className={styles.loading}>Loading dashboard…</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;

  return (
    <div className={styles.dashboard}>
      <div className={styles.dashboardWrapper}>
        <Sidebar />

        <main className={styles.main}>
          <Header />

          <div className={styles.heading}>
            <h1>Admin Dashboard</h1>
            <p>
              Welcome back, Admin! Here’s what’s happening on your platform.
            </p>
          </div>

          <div className={styles.statsGrid}>
            <StatCard
              title="Total Users"
              value={stats.totalUsers}
              icon={<FaUsers />}
              growth={stats.usersGrowth}
            />

            <StatCard
              title="Total Stores"
              value={stats.totalStores}
              icon={<FaStore />}
              growth={stats.storesGrowth}
            />

            <StatCard
              title="Total Ratings"
              value={stats.totalRatings}
              icon={<FaStar />}
              growth={stats.ratingsGrowth}
            />

            <StatCard
              title="Average Rating"
              value={stats.averageRating}
              icon={<FaChartLine />}
              growth={stats.averageRatingGrowth}
            />
          </div>

          <div className={styles.chartGrid}>
            <RatingsChart />
            <DistributionChart />
          </div>

          <div className={styles.tableGrid}>
            <RecentUsersTable users={stats.recentUsers || []} />
            <RecentStoresTable stores={stats.recentStores || []} />
          </div>
        </main>
      </div>
    </div>
  );
}
