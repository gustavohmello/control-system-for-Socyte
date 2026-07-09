import express from "express";
import timeController from "../controllers/timeController.js";


const router = express.Router();

// Time Resgiter

router.post("/registerTime", timeController.registerTime)
router.get("/listTime", timeController.listTime);
router.put("/:id/updateTime", timeController.updateTime);
router.delete("/:id/timeDelet", timeController.timeDelet);

router.get("/getday/:day",timeController.getDay);

export default router;

