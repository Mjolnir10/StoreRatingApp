// StoreCard component (CSS Modules)
import styles from "../../styles/StoreCard.module.css";
import { Link } from "react-router-dom";

/**
 * Props:
 *   store: { id, name, imageUrl, averageRating }
 */
export default function StoreCard({ store }) {
  return (
    <Link to={`/store/${store.id}`} className={styles.card}>
      <img src={store.imageUrl} alt={store.name} className={styles.image} />
      <div className={styles.body}>
        <div className={styles.title}>{store.name}</div>
        <div className={styles.rating}>Rating: {store.averageRating}</div>
      </div>
    </Link>
  );
}
