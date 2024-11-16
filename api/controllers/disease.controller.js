import Diseases from "../models/diseases.model.js";

export const getAllDiseases = async (req, res) => {
  try {
    const response = await Diseases.find({});
    res.json(response);
  } catch (error) {
    console.log(error);
  }
};
