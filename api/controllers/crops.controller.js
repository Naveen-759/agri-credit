import Crops from "../models/crops.model.js";
import Soil from "../models/soil.model.js";

export const getCrops = async (req, res) => {
  try {
    const soil = await Soil.findOne({ soil_type: req.query.st }).populate(
      "crops_grown"
    );
    if (!soil) {
      res.json("Soil not found");
    }
    res.json(soil.crops_grown);
    console.log(soil);
  } catch (error) {
    console.log("Error encountered", error);
  }
};

export const getAllCrops = async (req, res) => {
  try {
    const allCrops = await Crops.find({});
    res.json(allCrops);
  } catch (error) {
    console.log(error);
  }
};

export const getCropsBySoilId = async (req, res) => {
  try {
    const response = await Soil.findById({ _id: req.params.soilId }).populate(
      "crops_grown"
    );
    res.json(response.crops_grown);
  } catch (error) {
    console.log(error);
  }
};

export const cropUpdate = async (req, res) => {
  try {
    const updatedCrop = await Crops.findByIdAndUpdate(
      req.params.cropId,
      {
        $set: {
          crop_name: req.body.crop_name,
          sowing_period: req.body.sowing_period,
          duration_of_crop: req.body.duration_of_crop,
          harvesting_period: req.body.harvesting_period,
          img_url: req.body.img_url,
        },
      },
      { new: true }
    );
    return res.status(200).json(updatedCrop);
  } catch (error) {
    console.log(error);
  }
};

export const deleteCrop = async (req, res) => {
  try {
    const crop = await Crops.findByIdAndDelete(req.params.cropId);
    if (!crop) {
      res.status(400);
      res.json("Manure doesn.t exist");
    }

    res.json(crop);
  } catch (err) {
    console.log(err);
  }
};

export const addCrop = async (req, res) => {
  const {
    crop_name,
    sowing_period,
    duration_of_crop,
    harvesting_period,
    img_url,
  } = req.body;
  try {
    if (
      !crop_name ||
      !sowing_period ||
      !duration_of_crop ||
      !harvesting_period ||
      !grown_soils ||
      !img_url
    ) {
      res.status(400);
      throw new Error("All fields are mandatory");
    }
    const crop = await Crops.create({
      crop_name,
      sowing_period,
      duration_of_crop,
      harvesting_period,
      img_url,
    });
    res.json(crop);
    console.log("Added the crop");
  } catch (error) {
    console.log(error);
  }
};

// export default { getCrops };
