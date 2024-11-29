import { useState } from "react";

const NurseryAddCropForm = ({ onAdd }) => {
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [cost, setCost] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd({ name, quantity, cost });
        setName("");
        setQuantity("");
        setCost("");
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white shadow-lg rounded-lg p-6 space-y-4 max-w-md mx-auto"
        >
            <h3 className="text-lg font-semibold text-green-700">Add Crop</h3>
            <input
                type="text"
                placeholder="Crop Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
                type="number"
                placeholder="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
                className="w-full px-4 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
                type="number"
                placeholder="Cost"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
                required
                className="w-full px-4 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
                type="submit"
                className="w-full bg-green-600 text-white font-medium py-2 rounded-md hover:bg-green-700 transition-colors"
            >
                Add Crop
            </button>
        </form>
    );
};

export default NurseryAddCropForm;
