import styles from "./Table.module.css";

export default function RecentUsersTable({ users = [] }) {
  // Fallback to placeholder if no data
  const displayUsers = users.length ? users : [];

  return (
    <div className={styles.card}>
      <div className={styles.top}>
        <h3>Recent Users</h3>
        <button>View All</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {displayUsers.map((u) => (
            <tr key={u.email}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>
                <span className={styles.active}>{u.status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
