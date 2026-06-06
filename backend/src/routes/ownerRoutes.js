// Owner dashboard routes
import express from "express";
import { getOwnerDashboard } from "../controllers/ownerController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

// Get stats for the logged‑in store owner
router.get(
  "/dashboard",
  authMiddleware,
  roleMiddleware("store_owner"),
  getOwnerDashboard
);

export default router;
