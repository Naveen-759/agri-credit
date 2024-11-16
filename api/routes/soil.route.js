import express from "express";
import { soils } from "../controllers/soil.controller.js";
const router = express.Router();

router.get("/getsoils", soils);

export default router;
