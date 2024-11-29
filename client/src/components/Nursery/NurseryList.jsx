const NurseryList = ({ nurseries, onSelect, onDelete }) => {
    return (
        <div className="text-center">
            <h3 className="text-2xl font-bold text-green-700 mb-4">Nurseries</h3>
            {nurseries.length === 0 ? (
                <p className="text-gray-600">No nurseries registered.</p>
            ) : (
                <ul className="space-y-3">
                    {nurseries.map((nursery) => (
                        <li
                            key={nursery.id}
                            className="flex justify-between items-center p-4 bg-green-50 border border-green-300 rounded-lg shadow-sm"
                        >
                            <span
                                className="text-green-800 font-medium cursor-pointer hover:text-green-600"
                                onClick={() => onSelect(nursery)}
                            >
                                {nursery.name} ({nursery.place})
                            </span>
                            <button
                                className="text-red-600 hover:text-red-800 transition-colors font-medium"
                                onClick={() => onDelete(nursery.id)}
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default NurseryList;
