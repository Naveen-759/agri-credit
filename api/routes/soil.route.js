import express from "express";
import { soils, updateSoils } from "../controllers/soil.controller.js";
const router = express.Router();

router.get("/getsoils", soils);
router.put("/soilupdate", updateSoils);

export default router;
