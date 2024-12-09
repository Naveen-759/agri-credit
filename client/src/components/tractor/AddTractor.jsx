import React, { useState } from "react";
import { toast } from "react-toastify";

const AddTractor = () => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/tractors/addtractor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data);

        toast.success("Tractor registered successfully!");
        // Optionally reset form data or navigate to another page
      } else {
        toast.error(data.message || "Failed to register tractor");
      }
    } catch (error) {
      console.error("Error registering tractor:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen ">
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
          <div id="attachments" className="space-y-2 mt-1">
            {["Plough", "Harrow", "Rotavator", "Cultivator"].map(
              (attachment) => (
                <div key={attachment} className="flex items-center">
                  <input
                    type="checkbox"
                    id={attachment}
                    name="attachments"
                    value={attachment}
                    onChange={(e) => {
                      const { checked, value } = e.target;
                      setFormData((prevFormData) => ({
                        ...prevFormData,
                        attachments: checked
                          ? [...prevFormData.attachments, value]
                          : prevFormData.attachments.filter(
                              (item) => item !== value
                            ),
                      }));
                    }}
                    checked={formData.attachments.includes(attachment)}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor={attachment}
                    className="ml-2 block text-sm text-gray-700"
                  >
                    {attachment}
                  </label>
                </div>
              )
            )}
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Select all applicable attachments.
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

export default AddTractor;
