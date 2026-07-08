import express from "express";
import businessController from "../controllers/businessController.js";

const router = express.Router();

router.get("/", businessController.listBusiness);

router.put("/:id", businessController.updateBusiness);

router.delete("/:id",businessController.deleteBusiness);

export default router;