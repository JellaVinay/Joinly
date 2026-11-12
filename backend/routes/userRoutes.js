
import express from "express";
import { getUserCount, getDashboardData } from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/count", authMiddleware, getUserCount);
router.get("/dashboard", authMiddleware, getDashboardData);


router.get("/count", authMiddleware, getUserCount);
router.get("/dashboard", authMiddleware, getDashboardData);

export default router;
