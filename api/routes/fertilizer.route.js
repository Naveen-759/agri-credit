import express from "express";
import {
  getFertilizers,
  createFertilizer,
  getAllFertilizers,
} from "../controllers/fertilizer.controller.js";
const router = express.Router();

router.get("/getfertilizer", getFertilizers);
router.get("/getallfertilizers", getAllFertilizers);

router.get("/createfertilizer", createFertilizer);

export default router;
