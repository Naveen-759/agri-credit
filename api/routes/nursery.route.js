import express from "express";
import {
  createNursery,
  getAllNurseries,
  getNurseryById,
  updateNursery,
  deleteNursery,
  addNurseryCrop,
  getCropsByNursery,
} from "../controllers/nursery.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

// Route to create a new nursery
router.post("/add-nursery", createNursery);

// Route to get all nurseries
router.get("/get-nurseries", getAllNurseries);

// Route to get a specific nursery by ID
router.get("/:id", getNurseryById);

// Route to update a nursery by ID
router.put("/:id", updateNursery);

// Route to delete a nursery by ID
router.delete("/:id", deleteNursery);

router.post("/add-crop", verifyToken, addNurseryCrop);

router.get("/cropbynursery/:nurseryId", getCropsByNursery);

export default router;
