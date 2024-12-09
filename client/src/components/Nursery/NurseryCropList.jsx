import { useEffect, useState } from "react";
import NurseryAddCropForm from "./NurseryAddCropForm";

const NurseryCropList = ({ nursery }) => {
  const [crops, setCrops] = useState([]);
  const [adding, setAdding] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getNurseryCrops();
    // Avoid logging crops here since state updates asynchronously.
  }, []);

  const getNurseryCrops = async () => {
    try {
      const res = await fetch(`/api/nursery/cropbynursery/${nursery._id}`, {
        method: "GET",
      });
      if (!res.ok) {
        throw new Error("Failed to fetch crops.");
      }
      const cropData = await res.json();
      setCrops(cropData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching crops:", error);
      setLoading(false);
    }
  };

  const deleteCrop = async (index) => {
    const cropToDelete = crops[index];
    try {
      const res = await fetch(`/api/nursery/crops/${cropToDelete._id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setCrops((prevCrops) => prevCrops.filter((_, i) => i !== index));
      } else {
        console.error("Failed to delete crop.");
      }
    } catch (error) {
      console.error("Error deleting crop:", error);
    }
  };

  //   const addCrop = (newCrop) => {
  //     setCrops((prevCrops) => [...prevCrops, newCrop]);
  //   };

  //   if (loading) {
  //     return <p className="text-gray-600">Loading crops...</p>;
  //   }

  return (
    <div>
      <h3 className="text-xl font-bold text-green-700">
        {nursery.name}'s Crops
      </h3>
      <button
        onClick={() => setAdding(true)}
        className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 focus:ring focus:ring-blue-300 transition-all mb-3"
      >
        Add Crop
      </button>
      {crops.length === 0 ? (
        <p className="text-gray-600">No crops available.</p>
      ) : (
        <ul className="space-y-2">
          {crops.map((crop) => (
            <li
              key={crop._id}
              className="flex justify-between items-center p-4 bg-green-50 border border-green-300 rounded-md shadow-sm"
            >
              <div>
                <span className="font-medium text-green-800">{crop.name}</span>{" "}
                -
                <span className="text-sm text-gray-700">
                  {" "}
                  Qty: {crop.quantityAvailable}, Cost: ₹{crop.costPerCrop}
                </span>
              </div>
              <button
                onClick={() => deleteCrop(index)}
                className="text-red-600 hover:text-red-800 transition-colors font-medium"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
      {adding && <NurseryAddCropForm />}
      {/* <NurseryAddCropForm onAdd={addCrop} /> */}
    </div>
  );
};

export default NurseryCropList;
