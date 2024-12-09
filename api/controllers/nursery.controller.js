import Nursery from "../models/nursery.model.js"; // Adjust import based on your file structure
import NurseryCrop from "../models/nurseryCrop.model.js";

export const createNursery = async (req, res) => {
  try {
    const { user_id, name, place, ownerName, mobile, plantTypes } = req.body;
    console.log(req.body);

    // Validate if all required fields are provided
    if (!user_id || !name || !place || !ownerName || !mobile || !plantTypes) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Validate the mobile number format
    // if (!isValidPhoneNumber(mobile, "IN")) {
    //   // Replace 'IN' with the country code if needed
    //   return res.status(400).json({ message: "Invalid mobile number" });
    // }

    // Check if the nursery with the same mobile already exists
    const existingNursery = await Nursery.findOne({ where: { mobile } });
    if (existingNursery) {
      return res
        .status(400)
        .json({ message: "Nursery with this mobile already exists" });
    }

    // Create the new nursery
    console.log("creating nursery");
    const nursery = await Nursery.create({
      user_id,
      name,
      place,
      ownerName,
      mobile,
      plantTypes,
    });

    console.log("Nursery added successfully:", nursery);

    // Return the created nursery with a success message
    res.status(201).json({
      message: "Nursery added successfully",
      nursery, // You might want to return only the necessary fields for the client
    });
  } catch (error) {
    console.error("Error creating nursery:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Controller to get all nurseries
export const getAllNurseries = async (req, res) => {
  try {
    const nurseries = await Nursery.find();
    res.status(200).json(nurseries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Controller to get a single nursery by ID
export const getNurseryById = async (req, res) => {
  try {
    const nursery = await Nursery.findById(req.params.id);

    if (!nursery) {
      return res.status(404).json({ message: "Nursery not found" });
    }

    res.status(200).json(nursery);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Controller to update a nursery by ID
export const updateNursery = async (req, res) => {
  try {
    const { name, place, ownerName, mobile, plantTypes } = req.body;

    const nursery = await Nursery.findByIdAndUpdate(
      req.params.id,
      { name, place, ownerName, mobile, plantTypes },
      { new: true }
    );

    if (!nursery) {
      return res.status(404).json({ message: "Nursery not found" });
    }

    res.status(200).json(nursery);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Controller to delete a nursery by ID
export const deleteNursery = async (req, res) => {
  try {
    const nursery = await Nursery.findByIdAndDelete(req.params.id);

    if (!nursery) {
      return res.status(404).json({ message: "Nursery not found" });
    }

    res.status(200).json({ message: "Nursery deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Add a new crop
export const addNurseryCrop = async (req, res) => {
  const {
    name,
    category,
    growingSeason,
    soilType,
    // waterRequirement,
    // temperatureRange,
    description,
    imageURL,
    // createdBy,
    nursery,
    quantityAvailable,
    costPerCrop,
  } = req.body;

  try {
    console.log("-----------", nursery);

    // Check if the referenced nursery exists
    const existingNursery = await Nursery.findById(nursery);
    if (!existingNursery) {
      return res.status(404).json({ error: "Nursery not found" });
    }

    // Create a new crop document
    const newCrop = await NurseryCrop.create({
      name,
      category,
      growingSeason,
      soilType,
      // waterRequirement,
      // temperatureRange,
      description,
      imageURL,
      createdBy: req.user.id,
      nursery,
      quantityAvailable,
      costPerCrop,
    });

    // Save to database
    // const savedCrop = await newCrop.save();
    console.log(newCrop);

    res.status(201).json(newCrop);
  } catch (error) {
    console.error("Error adding crop:", error);
    res.status(500).json({
      error: "An error occurred while adding the crop.",
    });
  }
};

export const getCropsByNursery = async (req, res) => {
  // const { nurseryId } = req.params; // Extract nursery ID from the request params

  try {
    // Find crops associated with the given nursery ID
    console.log("Logging the get one", req.params.nurseryId);

    const crops = await NurseryCrop.find({ nursery: req.params.nurseryId });

    // // Check if crops exist for the given nursery
    // if (!crops || crops.length === 0) {
    //   return res
    //     .status(404)
    //     .json({ success: false, message: "No crops found for this nursery." });
    // }

    // Respond with the list of crops
    res.status(200).json(crops);
  } catch (error) {
    console.error("Error fetching crops:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch crops.", error });
  }
};
