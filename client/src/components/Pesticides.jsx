import React, { useState } from "react";

export default function Pesticides() {
  const [selectedOption1, setSelectedOption1] = useState("");
  const [selectedOption2, setSelectedOption2] = useState("");
  const [options2, setOptions2] = useState([]);
  const [pesticidesData, setPesticides] = useState([]);

  const handleDropdown1Change = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption1(selectedValue);

    // Define options based on selected crop
    const cropOptions = {
      Rice: ["Blast", "Sheath Blight"],
      Wheat: ["Rust", "Fusarium Head Blight"],
      Sugarcane: ["Red Rot", "Smut"],
      Cotton: ["Fusarium Wilt", "Verticillium Wilt"],
      Barley: ["Leaf Rust", "Powdery Mildew"],
      Soyabean: ["Soybean Rust", "Stem Canker"],
      Apple: ["Apple Scab", "Fire Blight"],
      Chickpea: ["Ascochyta Blight", "Fusarium Wilt"],
      Chilli: ["Anthracnose", "Powdery Mildew"],
      Cloves: ["Leaf Spot", "Dieback"],
      Coffee: ["Coffee Leaf Rust", "Coffee Berry Disease"],
      Ginger: ["Soft Rot", "Bacterial Wilt"],
      Groundnut: ["Leaf Spot", "Rust"],
      "Pearl Millet": ["Downy Mildew", "Ergot", "Rust", "Blast"],
      Pepper: ["Phytophthora Blight", "Anthracnose"],
      Potato: ["Potato Wart", "Potato Virus Y"],
      Sesame: ["Alternaria Leaf Spot", "Charcoal Rot"],
      Sorghum: ["Anthracnose", "Head Smut"],
      Sunflower: ["Rust", "Downy Mildew"],
      Tea: ["Blister Blight", "Brown Blight"],
      Tobacco: ["Tobacco Mosaic Virus", "Black Shank"],
    };

    // Set options for the second dropdown based on selected crop
    setOptions2(cropOptions[selectedValue] || []);
    setSelectedOption2(""); // Reset the selected disease name when crop changes
  };

  const handleDropdown2Change = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption2(selectedValue);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Add your fetch logic here
  };

  return (
    <div className="min-h-screen p-6 text-gray-800">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-green-600">
          Pesticide Identification
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div className="flex flex-col">
            <label htmlFor="cropName" className="font-medium text-gray-700">
              Crop Name
            </label>
            <select
              id="cropName"
              value={selectedOption1}
              onChange={handleDropdown1Change}
              className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select Crop Name</option>
              <option value="Rice">Rice</option>
              <option value="Wheat">Wheat</option>
              <option value="Sugarcane">Sugarcane</option>
              <option value="Cotton">Cotton</option>
              <option value="Barley">Barley</option>
              <option value="Soyabean">Soyabean</option>
              <option value="Apple">Apple</option>
              <option value="Chickpea">Chickpea</option>
              <option value="Chilli">Chilli</option>
              <option value="Cloves">Cloves</option>
              <option value="Coffee">Coffee</option>
              <option value="Ginger">Ginger</option>
              <option value="Groundnut">Groundnut</option>
              <option value="Pearl Millet">Pearl Millet</option>
              <option value="Pepper">Pepper</option>
              <option value="Potato">Potato</option>
              <option value="Sesame">Sesame</option>
              <option value="Sorghum">Sorghum</option>
              <option value="Sunflower">Sunflower</option>
              <option value="Tea">Tea</option>
              <option value="Tobacco">Tobacco</option>
            </select>
          </div>

          {/* Second dropdown for disease name */}
          <div className="flex flex-col">
            <label htmlFor="diseaseName" className="font-medium text-gray-700">
              Disease Name
            </label>
            <select
              id="diseaseName"
              value={selectedOption2}
              onChange={handleDropdown2Change}
              className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select Disease Name</option>
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

      {/* Conditional rendering for pesticidesData */}
      {pesticidesData.length > 0 && (
        <div className="mt-8 max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold mb-4 text-green-600">
            Pesticides List
          </h3>
          <ul className="space-y-4">
            {pesticidesData.map((pesticide, index) => (
              <li
                key={index}
                className="p-4 rounded-lg shadow-sm text-gray-800"
              >
                <h4 className="text-lg font-semibold">
                  {pesticide.pesticide_name}
                </h4>
                <ul className="mt-2 space-y-1">
                  <li>
                    <strong>Crop Name:</strong> {pesticide.crop_name}
                  </li>
                  <li>
                    <strong>Disease Name:</strong> {pesticide.disease_name}
                  </li>
                  <li>
                    <strong>Application Rate:</strong>{" "}
                    {pesticide.application_rate}
                  </li>
                  <li>
                    <strong>Safety Caution:</strong> {pesticide.safety_caution}
                  </li>
                  <li>
                    <strong>Storage Condition:</strong>{" "}
                    {pesticide.storage_condition}
                  </li>
                  <hr></hr>
                </ul>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
