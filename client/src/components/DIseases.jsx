import React, { useState } from "react";

export default function Disease() {
  const [selectedCropName, setSelectedCropName] = useState("");
  const [diseasesData, setDiseases] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Add your fetch logic here
  };

  const handleChange = (event) => {
    setSelectedCropName(event.target.value);
  };

  return (
    <div className="min-h-screen p-6 text-gray-800">
      <div className="max-w-4xl mx-auto  p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-green-600">
          Disease Identification
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div className="flex flex-col">
            <label htmlFor="cropName" className="font-medium text-gray-700">
              Crop Name
            </label>
            <select
              id="cropName"
              value={selectedCropName}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select Crop</option>
              <option value="Apple">Apple</option>
              <option value="Barley">Barley</option>
              <option value="Cotton">Cotton</option>
              <option value="Chickpea">Chickpea</option>
              <option value="Chilli">Chilli</option>
              <option value="Cloves">Cloves</option>
              <option value="Coffee">Coffee</option>
              <option value="Ginger">Ginger</option>
              <option value="Groundnut">Groundnut</option>
              <option value="Pearl Millet">Pearl Millet</option>
              <option value="Pepper">Pepper</option>
              <option value="Potato">Potato</option>
              <option value="Rice">Rice</option>
              <option value="Sesame">Sesame</option>
              <option value="Sorghum">Sorghum</option>
              <option value="Soyabean">Soyabean</option>
              <option value="Sugarcane">Sugarcane</option>
              <option value="Sunflower">Sunflower</option>
              <option value="Tea">Tea</option>
              <option value="Tobacco">Tobacco</option>
              <option value="Wheat">Wheat</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={selectedCropName === ""}
            className={`px-4 py-2 bg-green-500 text-white rounded-md font-medium hover:bg-green-600 transition duration-300 ${
              selectedCropName === "" && "opacity-50 cursor-not-allowed"
            }`}
          >
            Get List
          </button>
        </form>
      </div>

      {/* Conditional rendering for diseasesData */}
      {diseasesData.length > 0 && (
        <div className="mt-8 max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold mb-4 text-green-600">
            Diseases List
          </h3>
          <ul className="space-y-4">
            {diseasesData.map((disease, index) => (
              <li
                key={index}
                className="p-4 bg-green-100 rounded-lg shadow-sm text-gray-800"
              >
                <h4 className="text-lg font-semibold">{disease.name}</h4>
                <p>{disease.description}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
