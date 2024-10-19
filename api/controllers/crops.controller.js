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

// export default { getCrops };
