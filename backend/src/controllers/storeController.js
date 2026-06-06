// Store list controller
import pool from "../config/db.js";

export const listStores = async (req, res) => {
  try {
    const storesRes = await pool.query(
      `SELECT id, name, image_url AS "imageUrl", COALESCE(AVG(r.rating), 0) AS "averageRating"
       FROM stores s
       LEFT JOIN ratings r ON s.id = r.store_id
       GROUP BY s.id`
    );
    // Convert to simple JSON numbers
    const stores = storesRes.rows.map(row => ({
      id: row.id,
      name: row.name,
      imageUrl: row.imageUrl,
      averageRating: parseFloat(row.averageRating).toFixed(2),
    }));
    res.json(stores);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
