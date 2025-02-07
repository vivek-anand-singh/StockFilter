import { useState } from "react";
import { stockData } from "../data/stockData";
import { applyFilters } from "../utils/filterUtils";
import ResultsTable from "./ResultsTable";
import StockMetrics from "./StockMetrics";

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
  const [query, setQuery] = useState("");
  const [filteredStocks, setFilteredStocks] = useState([]);
  const [filters, setFilters] = useState([{ parameter: parameters[0], operator: operators[0], value: "" }]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const filtered = applyFilters(stockData, filters);
    setFilteredStocks(filtered);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <form onSubmit={handleSubmit} className="mb-6">
        {filters.map((filter, index) => (
          <div key={index} className="flex gap-4 items-center">
            <select value={filter.parameter} onChange={(e) => handleFilterChange(index, 'parameter', e.target.value)} className="flex-1 px-4 py-2 border border-black m-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              {parameters.map(param => <option key={param} value={param}>{param}</option>)}
            </select>
            <select value={filter.operator} onChange={(e) => handleFilterChange(index, 'operator', e.target.value)} className="flex-1 px-4 py-2 border border-black m-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              {operators.map(op => <option key={op} value={op}>{op}</option>)}
            </select>
            <input
              type="text"
              value={filter.value}
              onChange={(e) => handleFilterChange(index, 'value', e.target.value)}
              className="flex-1 px-4 py-2 border border-black m-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button type="button" onClick={() => handleRemoveFilter(index)} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg">Delete</button>
          </div>
        ))}
        <button type="button" onClick={handleAddFilter} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">Add Filter</button>
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">Apply Filters</button>
      </form>
      {filteredStocks.length > 0 ? <ResultsTable data={filteredStocks} /> : <StockMetrics />}
      {
        filteredStocks.length > 0 &&
        <button onClick={() => setFilteredStocks([])} className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg">
          Clear Results
        </button>
      }
    </div>
  );
};

export default ScreenerForm;