import Fertilizers from "../models/fertilizers.model.js";

export const getFertilizers = async (req, res) => {
  try {
    const fertilizers = await Fertilizers.find({
      crop_name: req.query.cn,
      soil_type: req.query.sn,
    });
    res.json(fertilizers);
  } catch (error) {
    console.log(error);
  }
};
