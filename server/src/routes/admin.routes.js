import express from "express";
import { adminOnly } from "../middleware/roleMiddleware.js";
import {
  getAdmins,
  getUsers,
  promoteToAdmin,
  demoteToUser,
  deleteUser,
  restoreUser,
  getProfile,
  updateProfile,
  changePassword,
} from "../controllers/admin.controller.js";

const router = express.Router();

// ✅ Admin Management Routes
router.get("/list/admins", adminOnly, getAdmins);
router.post("/promote-to-admin", adminOnly, promoteToAdmin);
router.post("/demote-to-user", adminOnly, demoteToUser);

// ✅ Users Management Routes
router.get("/list/users", adminOnly, getUsers);
router.post("/delete-user", adminOnly, deleteUser);
router.post("/restore-user", adminOnly, restoreUser);

// ✅ Admin Profile Routes
router.get("/profile", adminOnly, getProfile);
router.put("/profile/update", adminOnly, updateProfile);
router.post("/profile/change-password", adminOnly, changePassword);

export default router;
