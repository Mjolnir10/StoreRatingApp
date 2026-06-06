import styles from "./Sidebar.module.css";

import {
  FaHome,
  FaUsers,
  FaStore,
  FaStar,
  FaChartBar,
  FaUserShield,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

import { NavLink, useNavigate } from "react-router-dom";

export default function Sidebar({ links }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear auth token/role and redirect to login
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <div className={styles.logoIcon}>★</div>
        <div>
          <h2>Store Rating</h2>
          <span>Rate. Review. Discover.</span>
        </div>
      </div>

      <nav>
        {links && links.length ? (
          links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => (isActive ? styles.active : undefined)}
            >
              {/* Simple icons based on label – you can expand mapping as needed */}
              {link.label.includes('Dashboard') && <FaHome />}
              {link.label.includes('Users') && <FaUsers />}
              {link.label.includes('Stores') && <FaStore />}
              {link.label.includes('Ratings') && <FaStar />}
              {link.label.includes('Reports') && <FaChartBar />}
              {link.label.includes('Admins') && <FaUserShield />}
              {link.label.includes('Settings') && <FaCog />}
              {link.label}
            </NavLink>
          ))
        ) : (
          <>
            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) => (isActive ? styles.active : undefined)}
            >
              <FaHome />
              Dashboard
            </NavLink>

            <NavLink to="/admin/users" className={styles.link}>
              <FaUsers />
              Users
            </NavLink>

            <NavLink to="#" className={styles.link}>
              <FaStore />
              Stores
            </NavLink>

            <NavLink to="#" className={styles.link}>
              <FaStar />
              Ratings
            </NavLink>

            <NavLink to="#" className={styles.link}>
              <FaChartBar />
              Reports
            </NavLink>

            <NavLink to="#" className={styles.link}>
              <FaUserShield />
              Manage Admins
            </NavLink>

            <NavLink to="#" className={styles.link}>
              <FaCog />
              Settings
            </NavLink>
          </>
        )}
      </nav>

      <button className={styles.logout} onClick={handleLogout}>
        <FaSignOutAlt />
        Logout
      </button>
    </aside>
  );
}
