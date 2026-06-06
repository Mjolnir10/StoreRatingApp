// Navbar component (CSS Modules)

import styles from "../admin/components/Header";

export default function Navbar({ title }) {
  return (
    <header className={styles.navbar}>
      <div className={styles.title}>{title || "Store Rating"}</div>
    </header>
  );
}
