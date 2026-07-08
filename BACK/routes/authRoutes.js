import express from "express";
import authController from "../controllers/authController.js";


const router = express.Router();


// Auth User routes

router.post("/register", authController.register);
router.post("/login", authController.login) 

// Business Register

router.post("/registerBusiness", authController.registerBusiness)

// Time Resgiter

router.post("/registerTime", authController.registerTime)






     

export default router;