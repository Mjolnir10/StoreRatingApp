// Public store list routes
import express from "express";
import { listStores } from "../controllers/storeController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Return a list of all stores (basic info)
router.get("/", authMiddleware, listStores);

export default router;
