import { useEffect, useState } from "react";
import styles from "./Users.module.css";

const API_BASE = "http://localhost:5000/api/admin";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import layoutStyles from "./Dashboard.module.css";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();
      setUsers(data);
    } catch (e) {
      console.error(e);
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const updateRole = async (id, newRole) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE}/users/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ role: newRole }),
      });
      if (!res.ok) throw new Error("Failed to update role");
      // Optimistically update UI
      setUsers((prev) =>
        prev.map((u) => (u.id === id ? { ...u, role: newRole } : u))
      );
    } catch (e) {
      console.error(e);
      alert(e.message);
    }
  };

  if (loading) return <div className={styles.loading}>Loading users…</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;

  return (
    <div className={layoutStyles.dashboard}>
  <div className={layoutStyles.dashboardWrapper}>
    <Sidebar />
    <main className={layoutStyles.main}>
      <Header />
      <div className={styles.container}>
      <h2>All Users</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.address}</td>
              <td>
                <select
                  value={u.role}
                  onChange={(e) => updateRole(u.id, e.target.value)}
                >
                  <option value="admin">admin</option>
                  <option value="store_owner">store_owner</option>
                  <option value="user">user</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </main>
  </div>
</div>
  );
}
