import React, { useState } from "react";
import NurseryList from "./NurseryList";
import AddNurseryForm from "./AddNurseryForm";
import NurseryCropList from "./NurseryCropList";

const NurseryManagement = () => {
    const [nurseries, setNurseries] = useState([]);
    const [selectedNursery, setSelectedNursery] = useState(null);
    const [view, setView] = useState("list"); // 'list', 'register', 'manage'

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

    return (
        <div className="flex flex-col gap-6 p-6 bg-green-50 min-h-screen">
            {/* Header Section */}
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-green-700">Nursery Management</h1>
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
                        nurseries={nurseries}
                        onSelect={setSelectedNursery}
                        onDelete={deleteNursery}
                    />
                )}
                {view === "register" && <AddNurseryForm onAdd={addNursery} />}
                {view === "manage" && (
                    selectedNursery ? (
                        <NurseryCropList
                            nursery={selectedNursery}
                            onUpdateNursery={updateNursery}
                        />
                    ) : (
                        <p className="text-gray-600 text-center">
                            Select a nursery to manage crops.
                        </p>
                    )
                )}
            </div>
        </div>
    );
};

export default NurseryManagement;
