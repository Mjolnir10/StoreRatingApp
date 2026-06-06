import styles from "../../admin/components/Table.module.css";

// Expected order shape: { id, amount, created_at }
export default function OrdersTable({ orders = [] }) {
  return (
    <div className={styles.card}>
      <div className={styles.top}>
        <h3>Recent Orders</h3>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Amount</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id}>
              <td>{o.id}</td>
              <td>${o.amount}</td>
              <td>{new Date(o.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
