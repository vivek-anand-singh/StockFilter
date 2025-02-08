import { useState } from "react";
import axios from "axios";

const AddStockForm = ({ onClose }) => {
  const [stock, setStock] = useState({
    "ticker": "",
    "Market Capitalization": "",
    "P/E Ratio": "",
    "ROE": "",
    "Debt-to-Equity Ratio": "",
    "Dividend Yield": "",
    "Revenue Growth": "",
    "EPS Growth": "",
    "Current Ratio": "",
    "Gross Margin": ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStock({ ...stock, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`https://stockfilterbackend.onrender.com/api/stocks/add`, stock, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      console.log("Stock added:", response.data);
      onClose();
    } catch (error) {
      console.error("Error adding stock:", error);
    }
  };

  const placeholders = {
    "ticker": "STK3",
    "Market Capitalization": "366.26",
    "P/E Ratio": "18.93",
    "ROE": "32.38",
    "Debt-to-Equity Ratio": "0.05",
    "Dividend Yield": "4.53",
    "Revenue Growth": "12.94",
    "EPS Growth": "-2.49",
    "Current Ratio": "2.99",
    "Gross Margin": "63.21"
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        {Object.keys(stock).map((key) => (
          <div key={key} className="flex flex-col">
            <label className="font-medium text-gray-700">{key}</label>
            <input
              type="text"
              name={key}
              value={stock[key]}
              onChange={handleChange}
              placeholder={placeholders[key]}
              className="px-4 py-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        ))}
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
          Add Stock
        </button>
        <button type="button" onClick={onClose} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg">
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AddStockForm;