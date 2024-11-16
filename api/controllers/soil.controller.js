import Soil from "../models/soil.model.js";

export const soils = async (req, res) => {
  try {
    const response = await Soil.find({});
    res.json(response);
  } catch (error) {
    console.log(error);
  }
};
