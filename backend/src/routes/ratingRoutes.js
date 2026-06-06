import express from "express";
import { submitRating, getMyRating, listStoreRatings } from "../controllers/ratingController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

// Normal user submit or update rating for a store
router.post("/", authMiddleware, submitRating); // body should contain storeId and rating

// Get current user's rating for a particular store
router.get("/my/:storeId", authMiddleware, getMyRating);

// Store owner view ratings for their store
router.get("/owner", authMiddleware, roleMiddleware("store_owner"), listStoreRatings);

export default router;
