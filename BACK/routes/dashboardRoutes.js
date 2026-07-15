import express from "express";
import dashboardController from "../controllers/dashboardController.js";

const router = express.Router();

router.get("/", dashboardController.dashboard);
router.get("/userDashboard",dashboardController.userDashboard);

export default router;