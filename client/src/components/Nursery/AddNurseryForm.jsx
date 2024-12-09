import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddNurseryForm = ({ onAdd }) => {
  const [name, setName] = useState("");
  const [place, setPlace] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [mobile, setMobile] = useState("");
  const [plantTypes, setPlantTypes] = useState([]); // State to track selected plant types
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  // Handler for checkbox changes
  const handlePlantTypeChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setPlantTypes([...plantTypes, value]); // Add type if checked
    } else {
      setPlantTypes(plantTypes.filter((type) => type !== value)); // Remove type if unchecked
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create the form data object
    const nurseryData = {
      user_id: currentUser._id,
      name,
      place,
      ownerName,
      mobile,
      plantTypes, // Include selected plant types
      // crops: [], // Default empty array for crops
    };
    console.log(nurseryData);
    ``;
    try {
      // Send the data to the backend via POST request using fetch
      const response = await fetch("/api/nursery/add-nursery", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nurseryData), // Convert the object to a JSON string
      });

      // Check if the response was successful
      if (!response.ok) {
        toast.error("Failed to register nursery");
        throw new Error("Network response was not ok");
      }

      // Parse the response JSON

      const data = await response.json();
      navigate("/services?tab=nurseries");

      toast.success("Registered nursery successfully");

      console.log("Nursery added successfully:", data);

      // Reset all fields after successful submission
      setName("");
      setPlace("");
      setOwnerName("");
      setMobile("");
      setPlantTypes([]); // Reset plant types
    } catch (error) {
      console.error("There was an error adding the nursery:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg rounded-lg p-6 space-y-4 max-w-md mx-auto"
    >
      <h3 className="text-lg font-semibold text-green-700">Register Nursery</h3>
      <input
        type="text"
        placeholder="Nursery Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="w-full px-4 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <input
        type="text"
        placeholder="Place"
        value={place}
        onChange={(e) => setPlace(e.target.value)}
        required
        className="w-full px-4 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <input
        type="text"
        placeholder="Owner Name"
        value={ownerName}
        onChange={(e) => setOwnerName(e.target.value)}
        required
        className="w-full px-4 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <input
        type="text"
        placeholder="Mobile Number"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
        required
        className="w-full px-4 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <div>
        <p className="text-gray-700 font-medium">Type of Plants Sold:</p>
        <div className="flex flex-wrap gap-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              value="Indoor"
              checked={plantTypes.includes("Indoor")}
              onChange={handlePlantTypeChange}
              className="mr-2"
            />
            Indoor
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              value="Outdoor"
              checked={plantTypes.includes("Outdoor")}
              onChange={handlePlantTypeChange}
              className="mr-2"
            />
            Outdoor
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              value="Medicinal"
              checked={plantTypes.includes("Medicinal")}
              onChange={handlePlantTypeChange}
              className="mr-2"
            />
            Medicinal
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              value="Flowering"
              checked={plantTypes.includes("Flowering")}
              onChange={handlePlantTypeChange}
              className="mr-2"
            />
            Flowering
          </label>
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-green-600 text-white font-medium py-2 rounded-md hover:bg-green-700 transition-colors"
      >
        Add Nursery
      </button>
    </form>
  );
};

export default AddNurseryForm;
