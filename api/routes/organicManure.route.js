import express from "express";
import {
  addManure,
  getManures,
  getByUser,
} from "../controllers/organicManure.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/addmanure", verifyToken, addManure);
router.get("/getmanures", getManures);
router.get("/getbyuser", verifyToken, getByUser);

export default router;
