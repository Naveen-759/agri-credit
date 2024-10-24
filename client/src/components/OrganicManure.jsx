import React, { useEffect, useState } from "react";
import AddManure from "./AddManure";
import { toast } from "react-toastify";
// import SearchManure from "./SearchManure";

function OrganicManure() {
  const [viewType, setViewType] = useState("search"); // '' | 'add' | 'search'
  const [btn, setBtn] = useState("search");
  // const [sortType, setSortType] = useState("type");
  const [selectedManure, setSelectedManure] = useState(null); // Holds selected manure
  const [manureList, setManureList] = useState([]);

  const getManures = async () => {
    try {
      const res = await fetch("/api/manures/getmanures", {
        method: "GET",
      });

      if (res.ok) {
        const manures = await res.json();

        setManureList(manures);
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(manureList);

  useEffect(() => {
    // setViewType("add");
    getManures();
  }, [viewType, btn]);
  const handleManureClick = (manure) => {
    setSelectedManure({ ...manure });
  };

  const handleRequest = (manure) => {
    // const res = fetch(`/api/send-email/`, { method: "POST" });
    toast.success(`Request sent to the provider of ${manure.manure_type}`);
  };
  return (
    <div className="min-h-screen flex flex-col items-center  p-6 bg-white">
      <h1 className="text-4xl font-bold text-green-800 mb-4">Organic Manure</h1>
      <div className="flex space-x-4 mb-10">
        {btn === "add" && (
          <button
            onClick={() => {
              setViewType("search");
              setBtn("search");
            }}
            className="absolute right-10 mb-10 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Go Back
          </button>
        )}
        {btn === "search" && (
          <button
            onClick={() => {
              setViewType("add");
              setBtn("add");
            }}
            className="absolute right-10 mb-10 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Manure
          </button>
        )}
      </div>
      {viewType === "add" && <AddManure />}
      {viewType === "search" && (
        <div className="bg-white p-4 min-w-full rounded shadow-md">
          {selectedManure ? (
            <div className="manure-details">
              <h3 className="text-lg font-semibold">Manure Details</h3>
              <div className="flex space-x-4 justify-between">
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
                    <strong>Address:</strong> {selectedManure.address}
                  </p>
                  <p>
                    <strong>Owner:</strong> {selectedManure.posted_by}
                  </p>
                  <div className="flex space-x-2 mt-4">
                    <button
                      onClick={() => handleRequest(selectedManure)}
                      className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      Request Manure
                    </button>
                    <button
                      onClick={() => setSelectedManure(null)}
                      className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                    >
                      Close
                    </button>
                  </div>
                </div>
                <div className="manureimage">
                  <img
                    src={selectedManure.manure_img}
                    alt={selectedManure.type}
                    className="w-60 h-40 mr-10 object-cover rounded border border-gray-300"
                  />
                </div>
              </div>
            </div>
          ) : (
            // <>
            //   <div>
            //     <input type="checkbox" />
            //   </div>
            <ul className="manure-list space-y-2">
              {manureList &&
                manureList.map((item) => (
                  <li
                    onClick={() => handleManureClick(item)}
                    className="p-4 bg-green-100 rounded shadow cursor-pointer hover:bg-green-200"
                  >
                    <h4 className="font-bold">{item.manure_type}</h4>
                    <p>
                      {item.quantity} - {item.description}
                    </p>
                  </li>
                ))}
            </ul>
            // </>
          )}
        </div>
      )}
    </div>
  );
}

export default OrganicManure;
