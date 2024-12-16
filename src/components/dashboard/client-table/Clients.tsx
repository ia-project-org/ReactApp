const Clients = () => {
    return (
        <div className="col-span-3 bg-white shadow-md rounded-md p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">Clients</h2>
                <div className="flex space-x-2">
                    <button
                        className="bg-gray-100 rounded-md py-2 px-4 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            />
                        </svg>
                    </button>
                    <button
                        className="bg-gray-100 rounded-md py-2 px-4 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
                            />
                        </svg>
                    </button>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full table-auto">
                    <thead>
                    <tr className="bg-gray-100">
                        <th className="py-2 px-4 text-left">Client ID</th>
                        <th className="py-2 px-4 text-left">Full name</th>
                        <th className="py-2 px-4 text-left">Contact information</th>
                        <th className="py-2 px-4 text-left">Score</th>
                        <th className="py-2 px-4 text-left">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr className="border-b">
                        <td className="py-2 px-4">05141</td>
                        <td className="py-2 px-4">John Doe</td>
                        <td className="py-2 px-4">email@email.com</td>
                        <td className="py-2 px-4">
            <span className="bg-green-100 text-green-500 px-2 py-1 rounded-full">
                Good
                </span>
                        </td>
                        <td className="py-2 px-4">
                            <button
                                className="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                DETAILS
                            </button>
                        </td>
                    </tr>
                    {/* Add more rows as needed */}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default Clients;