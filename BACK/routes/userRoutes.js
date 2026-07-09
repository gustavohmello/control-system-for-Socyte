import express from "express";
import userController from "../controllers/userController.js";

const router = express.Router();

// User

router.get("/listUser", userController.listUser);
router.put("/:id/updateUser",userController.updateUser);
router.delete("/:id/userDelet",userController.userDelet);



export default router;