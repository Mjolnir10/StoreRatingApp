import styles from "./Table.module.css";
import React from "react";

// Expect recentStores as an array of objects: { id, name, address, createdAt }
export default function RecentStoresTable({ stores = [] }) {
  const displayStores = stores.length ? stores : [];

  return (
    <div className={styles.card}>
      <div className={styles.top}>
        <h3>Recent Stores</h3>
        <button>View All</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Address</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {displayStores.map((s) => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.name}</td>
              <td>{s.address}</td>
              <td>{s.createdAt?.split('T')[0] || ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
