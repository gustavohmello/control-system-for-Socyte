import express from "express";
import businessController from "../controllers/businessController.js";

const router = express.Router();

// Business Register

router.post("/registerBusiness", businessController.registerBusiness)
router.get("/listBusiness", businessController.listBusiness);
router.put("/:id/updateBusiness", businessController.updateBusiness);
router.delete("/:id/deleteBusiness",businessController.deleteBusiness);

export default router;