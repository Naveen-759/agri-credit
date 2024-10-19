import express from "express";
import { getFertilizers } from "../controllers/fertilizer.controller.js";
const router = express.Router();

router.post("/getfertilizers", getFertilizers);

export default router;
