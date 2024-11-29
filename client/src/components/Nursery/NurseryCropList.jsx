import { useState } from "react";
import NurseryAddCropForm from "./NurseryAddCropForm";

const NurseryCropList = ({ nursery, onUpdateNursery }) => {
    const [crops, setCrops] = useState(nursery.crops);

    const addCrop = (newCrop) => {
        const updatedCrops = [...crops, newCrop];
        setCrops(updatedCrops);
        onUpdateNursery(nursery.id, { ...nursery, crops: updatedCrops });
    };

    const deleteCrop = (index) => {
        const updatedCrops = crops.filter((_, i) => i !== index);
        setCrops(updatedCrops);
        onUpdateNursery(nursery.id, { ...nursery, crops: updatedCrops });
    };

    return (
        <div>
            <h3 className="text-xl font-bold text-green-700">{nursery.name}'s Crops</h3>
            {crops.length === 0 ? (
                <p className="text-gray-600">No crops available.</p>
            ) : (
                <ul className="space-y-2">
                    {crops.map((crop, index) => (
                        <li
                            key={index}
                            className="flex justify-between items-center p-4 bg-green-50 border border-green-300 rounded-md shadow-sm"
                        >
                            <div>
                                <span className="font-medium text-green-800">{crop.name}</span> -
                                <span className="text-sm text-gray-700"> Qty: {crop.quantity}, Cost: ₹{crop.cost}</span>
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
            <NurseryAddCropForm onAdd={addCrop} />
        </div>
    );
};

export default NurseryCropList;
