import React, { useState } from "react";

const TractorRegistrationForm = () => {
  const [formData, setFormData] = useState({
    tractorBrand: "",
    modelNumber: "",
    registrationNumber: "",
    engineCapacity: "",
    fuelType: "",
    attachments: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAttachmentsChange = (e) => {
    const { selectedOptions } = e.target;
    const values = Array.from(selectedOptions).map((option) => option.value);
    setFormData({ ...formData, attachments: values });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // Handle form submission logic here
    alert("Form submitted successfully!");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-200 via-white to-green-100">
      <form
        className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6 space-y-4"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-semibold text-center text-green-700">
          Tractor Registration
        </h2>

        {/* Tractor Brand */}
        <div className="form-group">
          <label
            htmlFor="tractorBrand"
            className="block text-sm font-medium text-gray-700"
          >
            Tractor Brand
          </label>
          <input
            type="text"
            name="tractorBrand"
            id="tractorBrand"
            value={formData.tractorBrand}
            onChange={handleChange}
            placeholder="Enter tractor brand"
            className="w-full p-2 mt-1 border rounded-md focus:ring-green-500 focus:border-green-500"
            required
          />
        </div>

        {/* Model Number */}
        <div className="form-group">
          <label
            htmlFor="modelNumber"
            className="block text-sm font-medium text-gray-700"
          >
            Model Number
          </label>
          <input
            type="text"
            name="modelNumber"
            id="modelNumber"
            value={formData.modelNumber}
            onChange={handleChange}
            placeholder="Enter model number"
            className="w-full p-2 mt-1 border rounded-md focus:ring-green-500 focus:border-green-500"
            required
          />
        </div>

        {/* Registration Number */}
        <div className="form-group">
          <label
            htmlFor="registrationNumber"
            className="block text-sm font-medium text-gray-700"
          >
            Registration Number
          </label>
          <input
            type="text"
            name="registrationNumber"
            id="registrationNumber"
            value={formData.registrationNumber}
            onChange={handleChange}
            placeholder="Enter registration number"
            className="w-full p-2 mt-1 border rounded-md focus:ring-green-500 focus:border-green-500"
            required
          />
        </div>

        {/* Engine Capacity */}
        <div className="form-group">
          <label
            htmlFor="engineCapacity"
            className="block text-sm font-medium text-gray-700"
          >
            Engine Capacity (HP)
          </label>
          <input
            type="number"
            name="engineCapacity"
            id="engineCapacity"
            value={formData.engineCapacity}
            onChange={handleChange}
            placeholder="Enter engine capacity"
            className="w-full p-2 mt-1 border rounded-md focus:ring-green-500 focus:border-green-500"
            required
          />
        </div>

        {/* Fuel Type */}
        <div className="form-group">
          <label
            htmlFor="fuelType"
            className="block text-sm font-medium text-gray-700"
          >
            Fuel Type
          </label>
          <select
            name="fuelType"
            id="fuelType"
            value={formData.fuelType}
            onChange={handleChange}
            className="w-full p-2 mt-1 border rounded-md focus:ring-green-500 focus:border-green-500"
            required
          >
            <option value="" disabled>
              Select fuel type
            </option>
            <option value="Diesel">Diesel</option>
            <option value="Electric">Electric</option>
          </select>
        </div>

        {/* Attachments Available */}
        <div className="form-group">
          <label
            htmlFor="attachments"
            className="block text-sm font-medium text-gray-700"
          >
            Attachments Available
          </label>
          <select
            name="attachments"
            id="attachments"
            multiple
            value={formData.attachments}
            onChange={handleAttachmentsChange}
            className="w-full p-2 mt-1 border rounded-md focus:ring-green-500 focus:border-green-500"
            required
          >
            <option value="Plough">Plough</option>
            <option value="Harrow">Harrow</option>
            <option value="Rotavator">Rotavator</option>
            <option value="Cultivator">Cultivator</option>
          </select>
          <p className="text-xs text-gray-500 mt-1">
            Hold Ctrl (or Cmd on Mac) to select multiple attachments.
          </p>
        </div>

        {/* Submit Button */}
        <div className="form-group">
          <button
            type="submit"
            className="w-full p-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:ring focus:ring-green-300"
          >
            Register Tractor
          </button>
        </div>
      </form>
    </div>
  );
};

export default TractorRegistrationForm;
