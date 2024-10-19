import React, { useState } from "react";

const FertiList = () => {
  const [selectedOption1, setSelectedOption1] = useState("");
  const [selectedOption2, setSelectedOption2] = useState("");
  const [options2, setOptions2] = useState([]);
  const [fertilizersData, setFertilizersData] = useState([]);

  const handleDropdown1Change = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption1(selectedValue);

    // Define options based on selected soil type
    const soilOptions = {
      "Alluvial soil": [
        "Wheat",
        "Rice",
        "Sugarcane",
        "Jute",
        "Pulses (Lentil)",
        "Mustard",
      ],
      "Black Soil": [
        "Cotton",
        "Soyabean",
        "Sugarcane",
        "Groundnut",
        "Wheat",
        "Chickpea",
        "Sunflower",
        "Sorghum",
      ],
      "Red Soil": [
        "Tomato",
        "Onion",
        "Cotton",
        "Tamarind",
        "Chili",
        "Sorghum (Jowar)",
        "Groundnut",
      ],
      "Loamy soil": ["Maize", "Tea", "Coffee", "Potato", "Barley"],
      "Sandy loam soil": [
        "Tobacco",
        "Groundnut",
        "Potato",
        "Cucumber",
        "Tomato",
      ],
      "Clayey soil": ["Rice", "Paddy", "Sugarcane", "Onion"],
    };

    // Set options for the second dropdown based on selected soil type
    setOptions2(soilOptions[selectedValue] || []);
    setSelectedOption2(""); // Reset the selected crop name when soil type changes
  };

  const handleDropdown2Change = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption2(selectedValue);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const encodedcn = encodeURIComponent(selectedOption2);
      const encodedsn = encodeURIComponent(selectedOption1);
      console.log(encodedcn, encodedsn);

      const fertilizers = await fetch(
        `/api/fertilizers/getfertilizers?cn=${encodedcn}&sn=${encodedsn}`,
        {
          method: "POST",
        }
      );
      const res = await fertilizers.json();
      setFertilizersData(res);
      if (fertilizers.ok) {
        console.log(fertilizersData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen p-6  text-gray-800">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-green-600">
          Fertilizer Recommendation
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div className="flex flex-col">
            <label htmlFor="soilType" className="font-medium text-gray-700">
              Soil Type
            </label>
            <select
              id="soilType"
              value={selectedOption1}
              onChange={handleDropdown1Change}
              className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select Soil Type</option>
              <option value="Alluvial soil">Alluvial Soil</option>
              <option value="Black Soil">Black Soil</option>
              <option value="Red Soil">Red Soil</option>
              <option value="Loamy soil">Loamy soil</option>
              <option value="Sandy loam soil">Sandy loam soil</option>
              <option value="Clayey soil">Clayey soil</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="cropName" className="font-medium text-gray-700">
              Crop Name
            </label>
            <select
              id="cropName"
              value={selectedOption2}
              onChange={handleDropdown2Change}
              className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select Crop Name</option>
              {options2.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={selectedOption1 === ""}
            className={`px-4 py-2 bg-green-500 text-white rounded-md font-medium hover:bg-green-600 transition duration-300 ${
              selectedOption1 === "" && "opacity-50 cursor-not-allowed"
            }`}
          >
            Get List
          </button>
        </form>
      </div>

      {fertilizersData.length > 0 && (
        <div className="mt-8 max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold mb-4 text-green-600">
            Fertilizers List
          </h3>
          <ul className="space-y-4">
            {fertilizersData.map((fertilizer, index) => (
              <>
                <li key={index} className="p-4 rounded-lg  text-gray-800">
                  <h4 className="text-lg font-semibold">
                    {fertilizer.fertilizer_name}
                  </h4>
                  <ul className="mt-2 space-y-1">
                    <li>
                      <strong>Crop Name:</strong> {fertilizer.crop_name}
                    </li>
                    <li>
                      <strong>Soil Type:</strong> {fertilizer.soil_type}
                    </li>
                    <li>
                      <strong>Growing Season:</strong>{" "}
                      {fertilizer.growing_season}
                    </li>
                    <li>
                      <strong>Application Rate:</strong>{" "}
                      {fertilizer.application_rate}
                    </li>
                    <li>
                      <strong>Physical Form:</strong> {fertilizer.physical_form}
                    </li>
                    <li>
                      <strong>Safety Caution:</strong>{" "}
                      {fertilizer.safety_caution}
                    </li>
                    <li>
                      <strong>Storage Condition:</strong>{" "}
                      {fertilizer.storage_condition}
                    </li>
                  </ul>
                </li>
                <hr />
              </>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FertiList;
