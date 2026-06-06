// Owner dashboard controller
import pool from "../config/db.js";

export const getOwnerDashboard = async (req, res) => {
  try {
    // Assuming each owner has a single store linked via user_id
    const storeRes = await pool.query(
      "SELECT id FROM stores WHERE owner_id = $1",
      [req.user.id]
    );

    if (storeRes.rows.length === 0) {
      return res.status(404).json({ message: "Store not found for owner" });
    }

    const storeId = storeRes.rows[0].id;

    const salesRes = await pool.query(
      "SELECT COALESCE(SUM(amount), 0) AS totalSales FROM orders WHERE store_id = $1",
      [storeId]
    );
    const ratingRes = await pool.query(
      "SELECT COALESCE(AVG(rating), 0) AS averageRating FROM ratings WHERE store_id = $1",
      [storeId]
    );
    const recentOrdersRes = await pool.query(
      "SELECT id, amount, created_at FROM orders WHERE store_id = $1 ORDER BY created_at DESC LIMIT 5",
      [storeId]
    );

    res.json({
      totalSales: parseFloat(salesRes.rows[0].totalsales),
      averageRating: parseFloat(ratingRes.rows[0].averagerating).toFixed(2),
      recentOrders: recentOrdersRes.rows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
