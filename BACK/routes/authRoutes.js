import express from "express";
import authController from "../controllers/authController.js";

const router = express.Router();

// Routers registro

router.post("/", authController.createUser);
router.get("/",authController.listUser);
router.put("/:id",authController.updateUser);
router.delete("/:id",authController.userDelet);

router.post("/login", authController.login)






     

export default router;