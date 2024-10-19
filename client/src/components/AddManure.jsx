// import { json } from "express";
import React, { useState } from "react";
// import axios from "axios";

const AddManure = () => {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    if (e.target.type === "file") {
      const file = e.target.files[0];
      setFormData({
        ...formData,
        image: file, // Store file object in the state
      });
    } else {
      setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
    }
  };

  const handleForm = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();

    // Append each form field to FormData
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      const manure = await fetch("api/manures/addmanure", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formDataToSend),
      });

      if (manure.ok) {
        const result = await manure.json();
        console.log("Form submitted successfully", result);
      } else {
        console.error("Failed to submit form");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  //   axios({
  //     method: "post",
  //     url: "/api/manures/addmanure",
  //     data: formDataToSend,
  //   })
  //     .then(function (response) {
  //       console.log(response);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // };

  return (
    <>
      <form
        onSubmit={handleForm}
        className="space-y-4 min-w-full mb-4 bg-white p-4 rounded shadow-md"
      >
        <label className="block">
          Manure Type:
          <select
            id="manure_type"
            onChange={handleChange}
            className="block w-full border border-gray-300 rounded p-2 mt-1"
          >
            <option value="selectmanure">Select type of manure</option>
            <option value="compost">Compost</option>
            <option value="vermicompost">Vermicompost</option>
            <option value="greenManure">Green Manure</option>
            <option value="cowDungManure">Cow dung Manure</option>
            <option value="chickenManure">Chicken Manure</option>
          </select>
        </label>
        <label className="block">
          Quantity (in loads):
          <input
            type="number"
            min="1"
            id="quantity"
            onChange={handleChange}
            className="block w-full border border-gray-300 rounded p-2 mt-1"
          />
        </label>
        <label className="block">
          Address:
          <input
            type="text"
            id="address"
            onChange={handleChange}
            placeholder="Enter the address"
            className="block w-full border border-gray-300 rounded p-2 mt-1"
          />
        </label>
        <label className="block">
          Upload Manure Image:
          <input
            type="file"
            accept="image/*"
            id="manure_img"
            onChange={handleChange}
            className="block w-full mt-1"
          />
        </label>
        <label className="block">
          Description:
          <textarea
            placeholder="Description of the manure"
            id="description"
            onChange={handleChange}
            className="block w-full border border-gray-300 rounded p-2 mt-1"
          ></textarea>
        </label>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Add Manure
        </button>
      </form>
    </>
  );
};

export default AddManure;
