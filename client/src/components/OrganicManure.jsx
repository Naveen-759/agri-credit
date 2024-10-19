import React, { useState } from "react";
import AddManure from "./AddManure";
import SearchManure from "./SearchManure";

function OrganicManure() {
  const [viewType, setViewType] = useState(""); // '' | 'add' | 'search'
  return (
    <div className="min-h-screen flex flex-col items-center  p-6 bg-white">
      {/* <Sidebar /> */}
      <h2 className="text-2xl font-bold text-green-800 mb-4">Organic Manure</h2>

      {/* Section Toggle */}
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => setViewType("add")}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Add Manure
        </button>
        <button
          onClick={() => setViewType("search")}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Search for Manure
        </button>
      </div>

      {/* Add Manure Form */}
      {viewType === "add" && <AddManure />}

      {/* Search Manure */}
      {viewType === "search" && <SearchManure />}
    </div>
  );
}

export default OrganicManure;
