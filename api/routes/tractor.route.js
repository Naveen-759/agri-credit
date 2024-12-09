import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { addTractor, getTractors } from "../controllers/tractor.controller.js";
const router = express.Router();

router.post("/addtractor", verifyToken, addTractor);
router.get("/", getTractors);

export default router;
