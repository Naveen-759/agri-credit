import { useEffect, useState } from "react";
import NurseryCropList from "./NurseryCropList";

const NurseryList = () => {
  const [nurseries, setNurseries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState(false);
  const [selectedNursery, setSelectedNursery] = useState(null);

  // Fetch nurseries from the backend
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

  if (loading) {
    return <p className="text-center text-gray-500">Loading nurseries...</p>;
  }

  //   const handleClick = (nursery) => {
  //     setView(true);
  //     setSelectedNursery(nursery);
  //   };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {nurseries.length === 0 ? (
        <p className="text-gray-600 col-span-full text-center">
          No nurseries registered.
        </p>
      ) : (
        nurseries.map((nursery) => (
          <div
            key={nursery._id}
            // onClick={() => handleClick(nursery)}
            className="bg-white border border-green-300 rounded-lg shadow-md p-4 cursor-pointer"
          >
            <h3 className="text-lg font-semibold text-green-700">
              {nursery.name}
            </h3>
            <p className="text-gray-700">
              <strong>Place:</strong> {nursery.place}
            </p>
            <p className="text-gray-700">
              <strong>Owner:</strong> {nursery.ownerName}
            </p>
            <p className="text-gray-700">
              <strong>Mobile:</strong> {nursery.mobile}
            </p>
            <div className="mt-2">
              <p className="text-gray-700 font-medium">Plant Types:</p>
              <ul className="flex flex-wrap gap-2">
                {nursery.plantTypes.map((type, index) => (
                  <li
                    key={index}
                    className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-sm"
                  >
                    {type}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default NurseryList;
