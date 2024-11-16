import Manure from "../models/organicManure.model.js";

export const addManure = async (req, res) => {
  console.log(req.body, req.user);

  const {
    manure_type,
    quantity,
    address,
    manure_img,
    manure_lat,
    manure_long,
    description,
  } = req.body;
  try {
    if (
      !manure_type ||
      !quantity ||
      !address ||
      !manure_img ||
      !manure_lat ||
      !manure_long ||
      !description
    ) {
      res.status(400);
      throw new Error("All fields are mandatory");
    }
    const manure = await Manure.create({
      manure_type,
      quantity: +quantity,
      address,
      manure_img,
      manure_lat,
      manure_long,
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

export const deleteManure = async (req, res) => {
  try {
    const manure = await Manure.findByIdAndDelete(req.params.manureId);
    if (!manure) {
      res.status(400);
      res.json("Manure doesn.t exist");
    }

    // if (manure.posted_by != req.user.id) {
    //   res.json(403);
    //   res.json("User doesn't access the post");
    // }

    res.json(manure);
  } catch (err) {
    console.log(err);
  }
};

export const updateManure = async (req, res) => {
  try {
    const updatedManure = await Manure.findByIdAndUpdate(
      req.params.manureId,
      {
        $set: {
          manure_type: req.body.manure_type,
          quantity: req.body.quantity,
          address: req.body.address,
          manure_img: req.body.manure_img,
          description: req.body.description,
        },
      },
      { new: true }
    );
    return res.status(200).json(updatedManure);
  } catch (error) {}
};

export const getManure = async (req, res) => {
  try {
    const manure = await Manure.findById(req.params.manureId);
    res.json(manure);
  } catch (error) {
    console.log(error);
  }
};
