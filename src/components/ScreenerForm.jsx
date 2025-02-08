import { useState } from "react";
import axios from "axios";
import ResultsTable from "./ResultsTable";
import StockMetrics from "./StockMetrics";
import AddStockForm from "./AddStockForm";

const parameters = [
  'Ticker',
  'Market Capitalization',
  'P/E Ratio',
  'ROE',
  'Debt-to-Equity Ratio',
  'Dividend Yield',
  'Revenue Growth',
  'EPS Growth',
  'Current Ratio',
  'Gross Margin'
];

const operators = ["<", ">", "="];

const ScreenerForm = () => {
  const [filteredStocks, setFilteredStocks] = useState([]);
  const [filters, setFilters] = useState([{ parameter: parameters[0], operator: operators[0], value: "" }]);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddFilter = () => {
    setFilters([...filters, { parameter: parameters[0], operator: operators[0], value: "" }]);
  };

  const handleRemoveFilter = (index) => {
    const newFilters = filters.filter((_, i) => i !== index);
    setFilters(newFilters);
  };

  const handleFilterChange = (index, key, value) => {
    const newFilters = filters.map((filter, i) => i === index ? { ...filter, [key]: value } : filter);
    setFilters(newFilters);
  };

  // https://stockfilterbackend.onrender.com

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://stockfilterbackend.onrender.com/api/stocks/screen', {
        conditions: filters
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setFilteredStocks(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-8">
      {showAddForm ? (
        <AddStockForm onClose={() => setShowAddForm(false)} />
      ) : (
        <>
          <form onSubmit={handleSubmit} className="space-y-6">
            {filters.map((filter, index) => (
              <div key={index} className="flex flex-wrap gap-4 items-center">
                <select value={filter.parameter} onChange={(e) => handleFilterChange(index, 'parameter', e.target.value)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  {parameters.map((param) => (
                    <option key={param} value={param}>{param}</option>
                  ))}
                </select>
                <select value={filter.operator} onChange={(e) => handleFilterChange(index, 'operator', e.target.value)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  {operators.map((op) => (
                    <option key={op} value={op}>{op}</option>
                  ))}
                </select>
                <input type="text" value={filter.value} onChange={(e) => handleFilterChange(index, 'value', e.target.value)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                <button type="button" onClick={() => handleRemoveFilter(index)} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg">Remove</button>
              </div>
            ))}
            <div className="flex justify-between">
              <button type="button" onClick={handleAddFilter} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">Add Filter</button>
              <button type="submit" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg">Apply Filters</button>
            </div>
          </form>
          {filteredStocks.length > 0 ? <ResultsTable data={filteredStocks} /> : <StockMetrics />}
          {filteredStocks.length > 0 && (
            <button onClick={() => setFilteredStocks([])} className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg">
              Clear Results
            </button>
          )}
          <button onClick={() => setShowAddForm(true)} className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg">
            Add Stock
          </button>
        </>
      )}
    </div>
  );
};

export default ScreenerForm;