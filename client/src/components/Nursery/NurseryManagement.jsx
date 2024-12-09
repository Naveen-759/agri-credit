import React, { useState, useEffect } from "react";
import NurseryList from "./NurseryList";
import AddNurseryForm from "./AddNurseryForm";
import NurseryCropList from "./NurseryCropList";
import { useSelector } from "react-redux";

const NurseryManagement = () => {
  const [nurseries, setNurseries] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedNursery, setSelectedNursery] = useState(null);
  const [view, setView] = useState("list"); // 'list', 'register', 'manage'
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchNurseries = async () => {
      try {
        const response = await fetch("/api/nursery/get-nurseries");
        if (!response.ok) {
          throw new Error("Failed to fetch nurseries.");
        }
        const data = await response.json();
        setNurseries(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching nurseries:", error);
        setLoading(false);
      }
    };

    fetchNurseries();
  }, []);

  const addNursery = (newNursery) => {
    setNurseries([...nurseries, newNursery]);
    setView("list");
  };

  const updateNursery = (id, updatedNursery) => {
    setNurseries(nurseries.map((n) => (n.id === id ? updatedNursery : n)));
  };

  const deleteNursery = (id) => {
    setNurseries(nurseries.filter((n) => n.id !== id));
    setSelectedNursery(null);
  };

  const handleAddCrop = (nurseryId, crop) => {
    const updatedNurseries = nurseries.map((nursery) => {
      if (nursery.id === nurseryId) {
        return {
          ...nursery,
          crops: [...(nursery.crops || []), crop],
        };
      }
      return nursery;
    });
    setNurseries(updatedNurseries);
  };

  // Filter nurseries for the current user
  const userNurseries = nurseries.filter(
    (nursery) => nursery.user_id === currentUser._id
  );

  return (
    <div className="flex flex-col gap-6 p-6 bg-green-50 min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-green-700">
          Nursery Management
        </h1>
        <div className="flex gap-4">
          <button
            onClick={() => setView("register")}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
          >
            Nursery Register
          </button>
          <button
            onClick={() => setView("manage")}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
          >
            Manage Crops
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 bg-white shadow-lg rounded-lg p-6">
        {view === "list" && (
          <NurseryList
            nurseries={userNurseries}
            onSelect={setSelectedNursery}
            onDelete={deleteNursery}
          />
        )}
        {view === "register" && <AddNurseryForm onAdd={addNursery} />}
        {view === "manage" && (
          <div>
            {selectedNursery ? (
              <NurseryCropList nursery={selectedNursery} />
            ) : userNurseries.length > 0 ? (
              <div className="bg-white shadow-lg rounded-lg p-6">
                <p className="text-gray-600 text-center mb-4 text-lg font-semibold">
                  Select a nursery to manage crops.
                </p>
                {userNurseries.length === 0 ? (
                  <p className="text-gray-500 text-center">
                    No nurseries available.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {userNurseries.map((nursery) => (
                      <div
                        key={nursery.id}
                        className="border border-gray-300 rounded-lg shadow-md p-4 hover:shadow-xl transition-shadow duration-200"
                      >
                        <h3 className="text-lg font-semibold text-green-700 mb-2">
                          {nursery.name}
                        </h3>
                        <p className="text-gray-700 mb-2">
                          <strong>Location:</strong> {nursery.place}
                        </p>
                        <button
                          onClick={() => {
                            setSelectedNursery(nursery);
                            console.log(nursery);
                          }}
                          className="bg-green-600 text-white text-sm font-medium px-4 py-2 rounded hover:bg-green-700 transition-colors duration-200"
                        >
                          Manage Crops
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <p className="text-gray-600 text-center">
                No nurseries available for the current user.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NurseryManagement;
