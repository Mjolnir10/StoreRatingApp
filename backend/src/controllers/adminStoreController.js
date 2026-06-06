// Admin store management controller
import pool from "../config/db.js";

/**
 * Create a new store (admin only).
 * Expected body: { name, address, imageUrl, ownerId (optional) }
 */
export const createStore = async (req, res) => {
  try {
    const { name, address, imageUrl, ownerId } = req.body;
    if (!name || !address) {
      return res.status(400).json({ message: "Name and address are required" });
    }
    await pool.query(
      `INSERT INTO stores (name, address, image_url, owner_id)
       VALUES ($1, $2, $3, $4)`,
      [name, address, imageUrl || null, ownerId || null]
    );
    res.status(201).json({ message: "Store created" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

/**
 * List stores with optional filters (query params: name, address)
 */
export const listAdminStores = async (req, res) => {
  try {
    const { name, address } = req.query;
    const conditions = [];
    const values = [];
    let idx = 1;
    if (name) { conditions.push(`name ILIKE $${idx++}`); values.push(`%${name}%`); }
    if (address) { conditions.push(`address ILIKE $${idx++}`); values.push(`%${address}%`); }
    const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";
    const query = `SELECT id, name, address, image_url AS "imageUrl", owner_id AS "ownerId" FROM stores ${where} ORDER BY id`;
    const result = await pool.query(query, values);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
