export const operators = [
    { value: '>', label: 'Greater than' },
    { value: '<', label: 'Less than' },
    { value: '=', label: 'Equal to' }
  ];
  
  export const stockMetrics = {
    'Market Capitalization': 'Market Capitalization',
    'P/E Ratio': 'P/E Ratio',
    'ROE': 'ROE',
    'Debt-to-Equity Ratio': 'Debt-to-Equity Ratio',
    'Dividend Yield': 'Dividend Yield',
    'Revenue Growth': 'Revenue Growth',
    'EPS Growth': 'EPS Growth',
    'Current Ratio': 'Current Ratio',
    'Gross Margin': 'Gross Margin'
  };
  
  export const parameters = [
    { id: 'Ticker', label: 'Ticker', unit: 'B' },
    { id: 'Market Capitalization', label: 'Market Capitalization', unit: 'B' },
    { id: 'P/E Ratio', label: 'P/E Ratio', unit: '' },
    { id: 'ROE', label: 'ROE', unit: '%' },
    { id: 'Debt-to-Equity Ratio', label: 'Debt-to-Equity Ratio', unit: '' },
    { id: 'Dividend Yield', label: 'Dividend Yield', unit: '%' },
    { id: 'Revenue Growth', label: 'Revenue Growth', unit: '%' },
    { id: 'EPS Growth', label: 'EPS Growth', unit: '%' },
    { id: 'Current Ratio', label: 'Current Ratio', unit: '' },
    { id: 'Gross Margin', label: 'Gross Margin', unit: '%' }
  ];

  export function applyFilters(stocks, filters) {
    return stocks.filter(stock => {
      return filters.every(filter => {
        const value = filter.value;
        const stockValue = stock[stockMetrics[filter.parameter]];
  
        switch (filter.operator) {
          case '>':
            return stockValue > value;
          case '<':
            return stockValue < value;
          case '=':
            return stockValue === value;
          default:
            return true;
        }
      });
    });
  }