import { type } from "express/lib/response";
import mongoose, { Schema, model } from "mongoose";
import cropsModel from "./crops.model.js";
import soilModel from "./soil.model.js";
import fertilizersModel from "./fertilizers.model.js";

const cropFertilizer = Schema({
  crop_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: cropsModel,
  },
  soil_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: soilModel,
  },
  fertilizer_id: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: fertilizersModel,
    },
  ],
});

export default model("CropFertilizer", cropFertilizer);
