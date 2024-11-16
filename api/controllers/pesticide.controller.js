import Pesticides from "../models/pesticides.model.js";

export const getAllPesticides = async (req, res) => {
  try {
    const response = await Pesticides.find({});
    res.json(response);
  } catch (error) {
    console.log(error);
  }
};
