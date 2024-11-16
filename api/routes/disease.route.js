import express from "express";
import { getAllDiseases } from "../controllers/disease.controller.js";
const router = express.Router();

router.get("/getalldiseases", getAllDiseases);

export default router;
