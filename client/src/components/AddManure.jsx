import React, { useState, useEffect, useContext } from "react";
import Alert from "@mui/material/Alert";

import { useGeolocated } from "react-geolocated";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useLocation } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";

import { app } from "../firebase";

const AddManure = ({ manure }) => {
  const { userLatitude, userLongitude } = useContext(GlobalContext);

  // console.log(userLatitude);
  // console.log(userLongitude);

  const [formData, setFormData] = useState({
    manure_type: manure ? manure.manure_type : "",
    quantity: manure ? manure.quantity : "",
    address: manure ? manure.address : "",
    manure_lat: userLatitude,
    manure_long: userLongitude,
    description: manure ? manure.description : "",
    manure_img: manure ? manure.manure_img : "",
  });
  // console.log(manure);
  // console.log(formData);

  const [imageFile, setImageFile] = useState(manure ? manure.manure_img : "");
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [success, setSuccess] = useState(false);

  const location = useLocation();

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
      const res = await fetch(
        manure
          ? `/api/manures/updatemanure/${manure._id}`
          : "/api/manures/addmanure",
        {
          method: manure ? "PUT" : "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          // body: JSON.stringify(formDataToSend),
          body: JSON.stringify(formData),
        }
      );

      if (res.ok) {
        const result = await res.json();
        console.log("Form submitted successfully", result);
        setSuccess(true);

        setFormData({
          manure_type: "selectmanure",
          quantity: 0,
          address: "",
          manure_lat: userLatitude,
          manure_long: userLongitude,
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
      {manure ? (
        <h1 className="flex bg-yellow-500 rounded w-36 items-center justify-center h-10 text-white">
          Update manure
        </h1>
      ) : (
        <h1 className="flex bg-yellow-500 rounded w-36 items-center justify-center h-10 text-white">
          Add manure
        </h1>
      )}
      <form
        onSubmit={handleForm}
        className="space-y-4 min-w-full mb-4 bg-white p-4 rounded shadow-md"
      >
        <label className="block">
          Manure Type:
          <select
            id="manure_type"
            value={formData.manure_type ? formData.manure_type : ""}
            required
            onChange={(e) => {
              setFormData({
                ...formData,
                manure_type: e.target.value.trim(),
              });
            }}
            className="block w-full border border-gray-300 rounded p-2 mt-1"
          >
            <option value="selectmanure">
              {manure ? manure.manure_type : "Select the type of manure"}
            </option>
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
            value={formData.quantity ? formData.quantity : ""}
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
          Address:
          <input
            type="text"
            id="address"
            value={formData.address ? formData.address : ""}
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
          <div className="flex">
            <input
              type="file"
              accept="image/*"
              id="manure_img"
              required
              onChange={(e) => setImageFile(e.target.files[0])}
              className="block w-full mt-1"
            />
            {imageFileUploading ? (
              <button
                disabled
                type="button"
                class="text-green-500 bg-slate-300 hover:bg-slate-100 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
              >
                <svg
                  aria-hidden="true"
                  role="status"
                  class="inline w-4 h-4 me-3 text-white animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  /> */}
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
                Uploading...
              </button>
            ) : (
              ""
            )}
          </div>
        </label>

        <label className="block">
          Description:
          <textarea
            placeholder="Description of the manure"
            id="description"
            value={formData.description ? formData.description : ""}
            required
            onChange={(e) =>
              setFormData({
                ...formData,
                description: e.target.value,
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
        {success ? (
          <Alert severity="success">Manure added Successfully</Alert>
        ) : (
          ""
        )}
      </form>
    </>
  );
};

export default AddManure;
