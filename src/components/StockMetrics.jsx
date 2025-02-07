import React from 'react';

const StockMetrics = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="text-gray-700 space-y-4">
        <p className="text-lg font-semibold">Stock Metrics Comparison</p>
        <p>To compare stocks on certain metrics, you can use the following keywords:</p>

        <div>
          <p className="font-medium text-gray-800">Suggested Metrics:</p>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-gray-600">
            <li>Market Capitalization</li>
            <li>P/E Ratio</li>
            <li>ROE</li>
            <li>Debt-to-Equity Ratio</li>
            <li>Dividend Yield</li>
            <li>Revenue Growth</li>
            <li>EPS Growth</li>
            <li>Current Ratio</li>
            <li>Gross Margin</li>
          </ul>
        </div>

        <div className="pt-4 border-t border-gray-300">
          <p>If you want sample data, press enter without any query in the input field.</p>
          <p className="mt-2">To filter the data, you can use the following query format:</p>
          <div className="mt-2 space-y-1 text-gray-600">
            <p className="font-medium">Market Capitalization &gt; 100</p>
            <p className="font-medium">ROE &gt; 15</p>
            <p className="font-medium">P/E Ratio &lt; [value]</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockMetrics;