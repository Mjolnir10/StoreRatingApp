// Admin user management controller
import pool from "../config/db.js";
import bcrypt from "bcryptjs";

/**
 * Admin can create a new user (any role).
 * Expected body: { name, email, password, address, role }
 */
export const createUser = async (req, res) => {
  try {
    const { name, email, password, address, role } = req.body;
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    // Check duplicate email
    const dup = await pool.query("SELECT id FROM users WHERE email = $1", [email]);
    if (dup.rows.length) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const hashed = await bcrypt.hash(password, 10);
    await pool.query(
      `INSERT INTO users (name, email, password, address, role)
       VALUES ($1, $2, $3, $4, $5)`,
      [name, email, hashed, address, role]
    );
    res.status(201).json({ message: "User created" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

/**
 * List users with optional filters (query params: name, email, address, role)
 */
export const listUsers = async (req, res) => {
  try {
    const { name, email, address, role } = req.query;
    const conditions = [];
    const values = [];
    let idx = 1;
    if (name) { conditions.push(`name ILIKE $${idx++}`); values.push(`%${name}%`); }
    if (email) { conditions.push(`email ILIKE $${idx++}`); values.push(`%${email}%`); }
    if (address) { conditions.push(`address ILIKE $${idx++}`); values.push(`%${address}%`); }
    if (role) { conditions.push(`role = $${idx++}`); values.push(role); }
    const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";
    const query = `SELECT id, name, email, address, role FROM users ${where} ORDER BY id`;
    const result = await pool.query(query, values);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

/**
 * Update a user's role (admin only).
 * Expected body: { role }
 */
export const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    if (!role) {
      return res.status(400).json({ message: "Role is required" });
    }
    await pool.query(
      `UPDATE users SET role = $1 WHERE id = $2`,
      [role, id]
    );
    res.json({ message: "User role updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};