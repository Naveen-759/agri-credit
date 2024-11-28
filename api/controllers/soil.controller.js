import Soil from "../models/soil.model.js";

export const soils = async (req, res) => {
  try {
    const response = await Soil.find({}).populate("crops_grown");
    console.log(response);

    res.json(response);
  } catch (error) {
    console.log(error);
  }
};

export const updateSoils = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
  }
};
