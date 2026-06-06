import express from "express";
import { getDashboardStats, getNotificationCount } from "../controllers/adminController.js";
import {
  createUser,
  listUsers,
  updateUserRole,
} from "../controllers/adminUserController.js";
import {
  createStore,
  listAdminStores,
} from "../controllers/adminStoreController.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/dashboard", authMiddleware, getDashboardStats);
router.get("/notifications/count", authMiddleware, getNotificationCount);

// Admin user management
router.post("/users", authMiddleware, roleMiddleware("admin"), createUser);
router.get("/users", authMiddleware, roleMiddleware("admin"), listUsers);
router.patch(
  "/users/:id",
  authMiddleware,
  roleMiddleware("admin"),
  updateUserRole,
);

// Admin store management
router.post("/stores", authMiddleware, roleMiddleware("admin"), createStore);
router.get("/stores", authMiddleware, roleMiddleware("admin"), listAdminStores);

export default router;
