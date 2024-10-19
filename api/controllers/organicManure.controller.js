import multer from "multer";
import Manure from "../models/organicManure.model.js";
import asyncHandler from "express-async-handler";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve("./public/uploads"));
  },
  filename: function (req, file, cb) {
    const filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });

export const addManure = asyncHandler(
  upload.single("manureImage"),
  async (req, res) => {
    const { manure_type, quantity, address, manure_img, description } =
      req.body;
    if (!manure_type || !quantity || !address || !manure_img || !description) {
      res.status(400);
      throw new Error("All fields are mandatory");
    }
    // console.log(req.user);
    const manure = await Manure.create({
      manure_type,
      quantity,
      address,
      manure_img: `/uploads/${req.file.filename}`,
      description,
      posted_by: req.user.id,
    });
    res.json(manure);
    console.log("Added the maure");
  }
);
