import { useEffect, useState } from "react";
import styles from "./Header.module.css";
import { FaBell } from "react-icons/fa";

const API_BASE = "http://localhost:5000/api/admin";

export default function Header() {
  const [notifCount, setNotifCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCount = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE}/notifications/count`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch notifications count");
      const data = await res.json();
      setNotifCount(data.count);
    } catch (e) {
      console.error(e);
      setError(e.message);
      setNotifCount(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCount();
  }, []);

  const displayCount = loading ? "…" : error ? "!" : notifCount;

  return (
    <header className={styles.header}>
      <div className={styles.notification}>
        <FaBell />
        <span>{displayCount}</span>
      </div>

      <div className={styles.profile}>
        <img src="https://i.pravatar.cc/150" alt="" />

        <div>
          <h4>Admin User</h4>
          <span>Super Admin</span>
        </div>
      </div>
    </header>
  );
}
