import express from "express";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/admin/dashboard", protect(["ADMIN"]), (req, res) => {
  res.json({ message: "Welcome Admin Dashboard" });
});

export default router;
