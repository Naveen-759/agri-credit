import React, { useContext, useState } from "react";
import AddManure from "./AddManure";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { GlobalContext } from "../context/GlobalState";

function OrganicManure() {
  const {
    calculateDistance,
    userLatitude,
    userLongitude,
    manureAdminList,
    getAllManures,
  } = useContext(GlobalContext);
  const [viewType, setViewType] = useState("search");
  const [btn, setBtn] = useState("search");
  const [display, setDisplay] = useState(false);
  const [newQuantity, setNewQuantity] = useState(0);
  const [filter, setFilter] = useState({
    type: "",
    minQuantity: 0,
    maxDistance: 0,
  });
  const [selectedManure, setSelectedManure] = useState(null);
  const { currentUser } = useSelector((state) => state.user);

  const handleManureClick = (manure) => {
    setSelectedManure({ ...manure });
  };

  const filteredManureList = manureAdminList.filter((manure) => {
    const matchesType = filter.type
      ? manure.manure_type.toLowerCase().includes(filter.type.toLowerCase())
      : true;

    const matchesQuantity = manure.quantity >= filter.minQuantity;

    const matchesDistance =
      filter.maxDistance > 0
        ? calculateDistance(
            userLatitude,
            userLongitude,
            manure.manure_lat,
            manure.manure_long
          ) <= filter.maxDistance
        : true;

    return matchesType && matchesQuantity && matchesDistance;
  });

  const handleRequest = () => {
    setDisplay(true);
  };

  const handleCancel = () => {
    setDisplay(false);
  };

  const handleBooking = async () => {
    if (!selectedManure) return;

    const bookingData = {
      itemId: selectedManure._id,
      itemType: "Manure",
      requesterId: currentUser._id,
      providerId: selectedManure.posted_by._id,
      quantity: newQuantity, // Include the new quantity in the booking request
    };

    try {
      const res = await fetch("/api/bookings/new-booking", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      if (res.ok) {
        toast.success(
          `Request sent to the provider of ${selectedManure.manure_type}`
        );
        setDisplay(false);
      } else {
        throw new Error("Failed to send request");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to request manure");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-6 bg-white">
      <h1 className="text-4xl font-bold text-green-800 mb-4">Organic Manure</h1>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
        <div className="w-full sm:w-auto flex justify-between">
          {btn === "add" ? (
            <button
              onClick={() => {
                setViewType("search");
                setBtn("search");
                getAllManures();
              }}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded shadow-lg transition duration-300"
            >
              Go Back
            </button>
          ) : (
            <button
              onClick={() => {
                setViewType("add");
                setBtn("add");
              }}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded shadow-lg transition duration-300"
            >
              Add Manure
            </button>
          )}
        </div>
        {viewType === "search" && !selectedManure && (
          <div className="flex flex-wrap gap-4 justify-center w-full sm:w-auto mt-4 sm:mt-0">
            <select
              className="border border-green-400 p-2 rounded bg-green-50 text-green-900 shadow-sm focus:outline-none focus:ring focus:ring-green-300"
              value={filter.type}
              onChange={(e) => setFilter({ ...filter, type: e.target.value })}
            >
              <option value="">All Types</option>
              <option value="Compost">Compost</option>
              <option value="Vermicompost">Vermicompost</option>
              <option value="Green Manure">Green Manure</option>
            </select>
            <select
              className="border border-green-400 p-2 rounded bg-green-50 text-green-900 shadow-sm focus:outline-none focus:ring focus:ring-green-300"
              value={filter.minQuantity}
              onChange={(e) =>
                setFilter({ ...filter, minQuantity: Number(e.target.value) })
              }
            >
              <option value={0}>All Quantities</option>
              <option value={10}>10 kg and above</option>
              <option value={50}>50 kg and above</option>
              <option value={100}>100 kg and above</option>
              <option value={500}>500 kg and above</option>
            </select>
            <select
              className="border border-green-400 p-2 rounded bg-green-50 text-green-900 shadow-sm focus:outline-none focus:ring focus:ring-green-300"
              value={filter.maxDistance}
              onChange={(e) =>
                setFilter({ ...filter, maxDistance: Number(e.target.value) })
              }
            >
              <option value={0}>All Distances</option>
              <option value={10}>Up to 10 km</option>
              <option value={20}>Up to 20 km</option>
              <option value={50}>Up to 50 km</option>
              <option value={100}>Up to 100 km</option>
            </select>
          </div>
        )}
      </div>

      {viewType === "add" && <AddManure />}
      {viewType === "search" && (
        <div className="bg-white p-4 min-w-full rounded shadow-md">
          {selectedManure ? (
            <div className="manure-details">
              <h3 className="text-lg font-semibold content-center">
                Manure Details
              </h3>
              <div className="flex flex-col sm:flex-row-reverse items-center space-x-4 justify-between">
                <div className="manureimage">
                  <img
                    src={selectedManure.manure_img}
                    alt={selectedManure.type}
                    className="w-60 h-40 object-cover rounded border border-gray-300"
                  />
                </div>
                <div className="manure-text">
                  <p>
                    <strong>Type:</strong> {selectedManure.manure_type}
                  </p>
                  <p>
                    <strong>Quantity:</strong> {selectedManure.quantity}
                  </p>
                  <p>
                    <strong>Description:</strong> {selectedManure.description}
                  </p>
                  <p>
                    <strong>Distance:</strong>{" "}
                    {calculateDistance(
                      userLatitude,
                      userLongitude,
                      selectedManure.manure_lat,
                      selectedManure.manure_long
                    )}{" "}
                    km
                  </p>
                  <div className="flex space-x-2 mt-4">
                    {/* Check if the current user is not the one who posted the manure */}
                    {currentUser._id !== selectedManure.posted_by._id &&
                      (selectedManure.quantity === 0 ? (
                        <p className="text-red-600 font-semibold">
                          Out of stock
                        </p>
                      ) : (
                        <button
                          onClick={handleRequest}
                          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                        >
                          Request
                        </button>
                      ))}
                    {/* Close button */}
                    <button
                      onClick={() => setSelectedManure(null)}
                      className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
              {display && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                  <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md">
                    <h2 className="text-xl font-bold mb-4">
                      Enter Required Quantity
                    </h2>
                    <input
                      type="number"
                      placeholder="Enter the quantity of manure required"
                      value={newQuantity}
                      onChange={(e) => setNewQuantity(Number(e.target.value))}
                      className="w-full p-2 border rounded mb-4"
                    />
                    <p className="mb-4">
                      Total Cost: ₹{newQuantity * selectedManure.cost_per_kg}
                    </p>
                    <div className="flex justify-end gap-4">
                      <button
                        onClick={handleBooking}
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={handleCancel}
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredManureList.map((manure) => (
                <li
                  key={manure._id}
                  className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition-all cursor-pointer"
                  onClick={() => handleManureClick(manure)}
                >
                  <img
                    src={manure.manure_img}
                    alt={manure.type}
                    className="w-full h-40 object-cover rounded mb-4"
                  />
                  <h3 className="text-lg font-semibold text-gray-700">
                    {manure.manure_type}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Quantity: {manure.quantity} kg
                  </p>
                  <p className="text-sm text-gray-500">
                    Distance:{" "}
                    {calculateDistance(
                      userLatitude,
                      userLongitude,
                      manure.manure_lat,
                      manure.manure_long
                    )}{" "}
                    km
                  </p>
                  <p className="text-sm text-gray-500">
                    Cost: ₹{manure.cost_per_kg} per kg
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default OrganicManure;
