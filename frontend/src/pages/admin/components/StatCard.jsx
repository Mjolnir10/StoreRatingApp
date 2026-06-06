import styles from "./StatCard.module.css";

export default function StatCard({ title, value, icon, growth }) {
  return (
    <div className={styles.card}>
      <div className={styles.icon}>{icon}</div>

      <div>
        <p>{title}</p>
        <h2>{value}</h2>
        <span>{growth}</span>
      </div>
    </div>
  );
}
