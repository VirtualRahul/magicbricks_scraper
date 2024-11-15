"use client"
import React from 'react';

export default function Table({ properties, currentPage, itemsPerPage, setCurrentPage }) {
    const indexOfLastProperty = currentPage * itemsPerPage;
    const indexOfFirstProperty = indexOfLastProperty - itemsPerPage;
    const currentProperties = properties?.slice(indexOfFirstProperty, indexOfLastProperty);

    // Calculate total pages
    const totalPages = Math.ceil(properties.length / itemsPerPage);

    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };
    return (
        <div className="mt-6 overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-md shadow-sm">
                <thead>
                    <tr>
                        <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Title
                        </th>
                        <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Price
                        </th>
                        <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Location
                        </th>
                        <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Image
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {currentProperties.map((property, index) => (
                        <tr key={index} className="hover:bg-gray-100">
                            <td className="px-6 py-4 border-b border-gray-200 text-sm text-gray-700">
                                {property.title}
                            </td>
                            <td className="px-6 py-4 border-b border-gray-200 text-sm text-gray-700">
                                {property.price}
                            </td>
                            <td className="px-6 py-4 border-b border-gray-200 text-sm text-gray-700">
                                {property.location}
                            </td>
                            <td className="px-6 py-4 border-b border-gray-200 text-sm text-gray-700">
                                <img  src={!property?.picture?.includes("data:image") && property?.picture != null ? property.picture : '/assets/dummy-property.jpg'}  alt={property.title} className="h-16 w-16 object-cover rounded-md" />
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>
            {/* Pagination controls */}
            <div className="mt-4 flex justify-between items-center">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md disabled:bg-gray-300"
                >
                    Previous
                </button>

                <span className="text-sm text-gray-700">
                    Page {currentPage} of {totalPages}
                </span>

                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md disabled:bg-gray-300"
                >
                    Next
                </button>
            </div>
        </div>
    );
}
