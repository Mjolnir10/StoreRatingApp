// Rating controller
import pool from "../config/db.js";

/**
 * Submit a new rating for a store (or update if exists).
 * Expected body: { storeId, rating }
 * User is identified via auth middleware (req.user.id).
 */
export const submitRating = async (req, res) => {
  try {
    const userId = req.user.id;
    const { storeId, rating } = req.body;

    if (!storeId || !rating) {
      return res.status(400).json({ message: "storeId and rating are required" });
    }
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Rating must be between 1 and 5" });
    }

    // Upsert rating: if user already rated this store, update; otherwise insert
    await pool.query(
      `INSERT INTO ratings (user_id, store_id, rating)
       VALUES ($1, $2, $3)
       ON CONFLICT (user_id, store_id) DO UPDATE SET rating = EXCLUDED.rating`,
      [userId, storeId, rating]
    );

    res.status(200).json({ success: true, message: "Rating saved" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

/**
 * Get rating submitted by the current user for a specific store.
 */
export const getMyRating = async (req, res) => {
  try {
    const userId = req.user.id;
    const { storeId } = req.params;
    const result = await pool.query(
      `SELECT rating FROM ratings WHERE user_id = $1 AND store_id = $2`,
      [userId, storeId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "No rating found" });
    }
    res.json({ rating: result.rows[0].rating });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

/**
 * Owner view: list of users who rated the owner's store with their rating.
 */
export const listStoreRatings = async (req, res) => {
  try {
    // Find store owned by the logged‑in owner
    const storeResult = await pool.query(
      `SELECT id FROM stores WHERE owner_id = $1`,
      [req.user.id]
    );
    if (storeResult.rows.length === 0) {
      return res.status(404).json({ message: "Store not found for owner" });
    }
    const storeId = storeResult.rows[0].id;

    const ratings = await pool.query(
      `SELECT u.id, u.name, u.email, r.rating, r.created_at
       FROM ratings r
       JOIN users u ON r.user_id = u.id
       WHERE r.store_id = $1
       ORDER BY r.created_at DESC`,
      [storeId]
    );
    res.json(ratings.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
