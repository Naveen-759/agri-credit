import express from "express";
import { getAllPesticides } from "../controllers/pesticide.controller.js";

const router = express.Router();

router.get("/getallpesticides", getAllPesticides);

export default router;
