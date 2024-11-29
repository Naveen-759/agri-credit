import { useState } from "react";

const AddNurseryForm = ({ onAdd }) => {
    const [name, setName] = useState("");
    const [place, setPlace] = useState("");
    const [owner, setOwner] = useState("");
    const [mobile, setMobile] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd({
            id: Date.now(),
            name,
            place,
            owner,
            mobile,
            crops: []
        });
        setName("");
        setPlace("");
        setOwner("");
        setMobile("");
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white shadow-lg rounded-lg p-6 space-y-4 max-w-md mx-auto"
        >
            <h3 className="text-lg font-semibold text-green-700">Register Nursery</h3>
            <input
                type="text"
                placeholder="Nursery Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
                type="text"
                placeholder="Place"
                value={place}
                onChange={(e) => setPlace(e.target.value)}
                required
                className="w-full px-4 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
                type="text"
                placeholder="Owner Name"
                value={owner}
                onChange={(e) => setOwner(e.target.value)}
                required
                className="w-full px-4 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
                type="text"
                placeholder="Mobile Number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
                className="w-full px-4 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
                type="submit"
                className="w-full bg-green-600 text-white font-medium py-2 rounded-md hover:bg-green-700 transition-colors"
            >
                Add Nursery
            </button>
        </form>
    );
};

export default AddNurseryForm;
