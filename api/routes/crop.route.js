import express from "express";
import { getAllCrops, getCrops } from "../controllers/crops.controller.js";

const router = express.Router();

router.post("/getcrops", getCrops);
router.get("/getallcrops", getAllCrops);

export default router;
