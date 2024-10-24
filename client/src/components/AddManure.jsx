import React, { useState, useEffect } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

import { app } from "../firebase";

const AddManure = () => {
  const [formData, setFormData] = useState({
    manure_type: "selectmanure",
    quantity: 0,
    address: "",
    description: "",
  });
  // const [file, setFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  console.log(formData);
  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    console.log("Calling");

    setImageFileUploading(true);
    setImageFileUploadError(null);
    const storage = getStorage(app);
    const fileName = `${new Date().getTime()}_${imageFile.name}`;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError(
          "Could not upload image (File must be less than 2MB)"
        );
        resetImageUploadState();
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("Url genearted", downloadURL);

          setImageFileUrl(downloadURL);
          setFormData((prev) => ({ ...prev, manure_img: downloadURL }));
          setImageFileUploading(false);
        });
      }
    );
  };

  const handleForm = async (e) => {
    e.preventDefault();
    try {
      const manure = await fetch("/api/manures/addmanure", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        // body: JSON.stringify(formDataToSend),
        body: JSON.stringify(formData),
      });

      if (manure.ok) {
        const result = await manure.json();
        console.log("Form submitted successfully", result);
        setFormData({
          manure_type: "selectmanure",
          quantity: 0,
          address: "",
          description: "",
        });
        setImageFile(null);
        e.target.reset();
      } else {
        console.error("Failed to submit form");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const resetImageUploadState = () => {
    setImageFileUploadProgress(null);
    setImageFile(null);
    setImageFileUrl(null);
    setImageFileUploading(false);
  };
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
            required
            onChange={(e) => {
              setFormData({
                ...formData,
                manure_type: e.target.value.trim(),
              });
            }}
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
            required
            onChange={(e) =>
              setFormData({
                ...formData,
                quantity: e.target.value.trim(),
              })
            }
            className="block w-full border border-gray-300 rounded p-2 mt-1"
          />
        </label>
        <label className="block">
          Mobile No.:
          <input
            type="number"
            min="10"
            id="mobile"
            required
            onChange={(e) =>
              setFormData({
                ...formData,
                mobile: e.target.value.trim(),
              })
            }
            className="block w-full border border-gray-300 rounded p-2 mt-1"
          />
        </label>
        <label className="block">
          Address:
          <input
            type="text"
            id="address"
            required
            onChange={(e) =>
              setFormData({
                ...formData,
                address: e.target.value.trim(),
              })
            }
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
            required
            onChange={(e) => setImageFile(e.target.files[0])}
            className="block w-full mt-1"
          />
          {/* {imageFileUploadProgress && (
            <CircularProgressbar
              value={imageFileUploadProgress}
              text={`${imageFileUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${
                    imageFileUploadProgress / 100
                  })`,
                },
              }}
            /> */}
          {/* )} */}
        </label>

        <label className="block">
          Description:
          <textarea
            placeholder="Description of the manure"
            id="description"
            required
            onChange={(e) =>
              setFormData({
                ...formData,
                description: e.target.value.trim(),
              })
            }
            className="block w-full border border-gray-300 rounded p-2 mt-1"
          ></textarea>
        </label>
        <button
          type="submit"
          disabled={
            formData.manure_type === "selectmanure" ||
            formData.quantity === 0 ||
            formData.address === "" ||
            formData.description === ""
          }
          className={`w-full px-4 py-2 text-white rounded  ${
            formData.manure_type === "selectmanure" ||
            formData.quantity === 0 ||
            formData.address === "" ||
            formData.description === "" ||
            imageFileUploading
              ? " bg-green-300"
              : " bg-green-600 hover:bg-green-700"
          }`}
        >
          Add Manure
        </button>
      </form>
    </>
  );
};

export default AddManure;
