import Manure from "../models/organicManure.model.js";

export const addManure = async (req, res) => {
  console.log(req.body, req.user);

  const { manure_type, quantity, address, manure_img, description } = req.body;
  try {
    if (!manure_type || !quantity || !address || !manure_img || !description) {
      res.status(400);
      throw new Error("All fields are mandatory");
    }
    const manure = await Manure.create({
      manure_type,
      quantity: +quantity,
      address,
      manure_img,
      description,
      posted_by: String(req.user.name),
    });
    res.json(manure);
    console.log("Added the maure");
  } catch (error) {
    console.log(error);
  }
};

export const getManures = async (req, res) => {
  try {
    const manures = await Manure.find({});
    res.json(manures);
    console.log(manures);
  } catch (error) {
    console.log(error);
  }
};

export const getByUser = async (req, res) => {
  try {
    const manuresByUser = await Manure.find({ posted_by: req.user.name });
    res.json(manuresByUser);
  } catch (err) {
    console.log(err);
  }
};
