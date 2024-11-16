import CropFertilizer from "../models/cropFertilizers.model.js";
import Fertilizers from "../models/fertilizers.model.js";

export const getFertilizers = async (req, res) => {
  try {
    const fertilizers = await CropFertilizer.findOne({
      soil_id: req.query.sid,
      crop_id: req.query.cid,
    }).populate("fertilizer_id");

    if (!fertilizers) {
      return res.status(404).json({ message: "No matching fertilizers found" });
    }
    res.json(fertilizers.fertilizer_id);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllFertilizers = async (req, res) => {
  try {
    const fertilizers = await Fertilizers.find({});

    res.json(fertilizers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const createFertilizer = async (req, res) => {
  {
    try {
      const ferti = await Fertilizers.create({
        fertilizer_name: req.body.fertilizer_name,
        application_rate: req.body.application_rate,
        growing_season: req.body.growing_season,
        physical_form: req.body.physical_form,
        storage_condition: req.body.storage_condition,
        safety_caution: req.body.safety_caution,
        img_url: req.body.img_url,
      });
      console.log(ferti);
    } catch (error) {
      console.log(error);
    }
  }
};
