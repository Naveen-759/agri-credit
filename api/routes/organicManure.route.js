import express from "express";
import { addManure } from "../controllers/organicManure.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/addmanure",  addManure);

export default router;
