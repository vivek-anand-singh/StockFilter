import { useState } from 'react';
import { stockMetrics } from '../utils/filterUtils';
import { parameters } from '../data/stockData';

const ResultsTable = ({ data }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const sortedData = [...data].sort((a, b) => {
    if (!sortConfig.key) return 0;

    const aValue = a[stockMetrics[sortConfig.key]];
    const bValue = b[stockMetrics[sortConfig.key]];

    if (sortConfig.direction === 'asc') {
      return aValue - bValue;
    }
    return bValue - aValue;
  });

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc'
    });
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-100">
              {Object.values(stockMetrics).map((metric, index) => (
                <th
                  key={index}
                  onClick={() => handleSort(Object.keys(stockMetrics)[index])}
                  className="cursor-pointer px-4 py-3 border-b text-left font-medium text-gray-700 hover:bg-gray-200"
                >
                  {metric}
                  {sortConfig.key === Object.keys(stockMetrics)[index] && (
                    <span className="ml-2">{sortConfig.direction === 'asc' ? '▲' : '▼'}</span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentItems.map((stock, index) => (
              <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : ''} hover:bg-gray-100`}>
                {Object.values(stockMetrics).map((metric, index) => (
                  <td key={index} className="px-4 py-3 border-b text-gray-700">
                    {stock[metric]}{parameters[index].unit}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex justify-center gap-4">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4 py-2 bg-gray-100 rounded text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ResultsTable;