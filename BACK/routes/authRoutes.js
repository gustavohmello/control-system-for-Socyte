import express from "express";
import authController from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";


const router = express.Router();

router.get("/",authMiddleware,authController.listUser);
router.put("/:id",authController.updateUser);
router.delete("/:id",authController.userDelet);

// Auth User routes

router.post("/register", authController.register);
router.post("/login", authController.login) 

// Business Register

router.post("/registerBusiness", authController.registerBusiness)

// Time Resgiter

router.post("/registerTime", authController.registerTime)






     

export default router;