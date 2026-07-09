import express from "express";
import updateAndDeletController from "../controllers/updateAndDeletController.js";

const router = express.Router();

// Business

router.get("/listBusiness", updateAndDeletController.listBusiness);
router.put("/:id/updateBusiness", updateAndDeletController.updateBusiness);
router.delete("/:id/deleteBusiness",updateAndDeletController.deleteBusiness);

// User

router.get("/listUser", updateAndDeletController.listUser);
router.put("/:id/updateUser",updateAndDeletController.updateUser);
router.delete("/:id/userDelet",updateAndDeletController.userDelet);

// Time

router.get("/listTime", updateAndDeletController.listTime);
router.put("/:id/updateTime", updateAndDeletController.updateTime);
router.delete("/:id/timeDelet", updateAndDeletController.timeDelet);

export default router;