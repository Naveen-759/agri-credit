import Tractor from "../models/tractor.model.js"; // Adjust the path to the model

export const addTractor = async (req, res) => {
  const {
    tractorBrand,
    modelNumber,
    registrationNumber,
    engineCapacity,
    fuelType,
    attachments,
  } = req.body;

  try {
    // Ensure `req.user` exists and contains `_id`
    if (!req.user || !req.user.id) {
      return res.status(400).json({ message: "User is not authenticated" });
    }

    const userId = req.user.id; // Extract `userId` from `req.user`
    console.log("Authenticated User ID:", userId);

    // Check if a tractor with the same registration number already exists
    const existingTractor = await Tractor.findOne({ registrationNumber });
    if (existingTractor) {
      return res.status(400).json({
        message: "Tractor with this registration number already exists",
      });
    }

    // Create and save the new tractor
    const newTractor = await Tractor.create({
      userId, // Pass `userId` explicitly
      tractorBrand,
      modelNumber,
      registrationNumber,
      engineCapacity,
      fuelType,
      attachments,
    });

    console.log("New Tractor Registered:", newTractor);

    res.status(201).json({
      message: "Tractor registered successfully",
      tractor: newTractor,
    });
  } catch (error) {
    console.error("Error adding tractor:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getTractors = async (req, res) => {
  try {
    const tractors = await Tractor.find({}).populate("userId");
    res.json(tractors);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch manures" });
  }
};
