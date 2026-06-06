import pool from "../config/db.js";

// Dashboard statistics including growth placeholders and recent data
export const getDashboardStats = async (req, res) => {
  try {
    const users = await pool.query(`
      SELECT COUNT(*) FROM users
    `);

    const stores = await pool.query(`
      SELECT COUNT(*) FROM stores
    `);

    const ratings = await pool.query(`
      SELECT COUNT(*) FROM ratings
    `);

    const avgRating = await pool.query(`
      SELECT ROUND(AVG(rating)::numeric,1) AS average
      FROM ratings
    `);

    // Rating distribution: count per rating value (1-5)
    const distribution = await pool.query(`
      SELECT rating, COUNT(*) AS count
      FROM ratings
      GROUP BY rating
      ORDER BY rating DESC
    `);

    const recentUsers = await pool.query(`
      SELECT id, name, email, role
      FROM users
      ORDER BY id DESC
      LIMIT 5
    `);

    const recentStores = await pool.query(`
      SELECT id, name, address
      FROM stores
      ORDER BY id DESC
      LIMIT 5
    `);

    res.json({
      totalUsers: Number(users.rows[0].count),
      totalStores: Number(stores.rows[0].count),
      totalRatings: Number(ratings.rows[0].count),
      averageRating: avgRating.rows[0].average || 0,
      ratingDistribution: distribution.rows.map(row => ({ rating: Number(row.rating), count: Number(row.count) })),
      recentUsers: recentUsers.rows,
      recentStores: recentStores.rows,
      // Placeholder growth values – replace with real calculations later
      usersGrowth: "0%",
      storesGrowth: "0%",
      ratingsGrowth: "0%",
      averageRatingGrowth: "0%",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Simple placeholder for notification count – can be expanded later
export const getNotificationCount = async (req, res) => {
  // No notification system yet, return zero
  res.json({ count: 0 });
};
