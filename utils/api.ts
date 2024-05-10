const API_KEY = '0JF2RMCF6OR6BNDV';
const BASE_URL = 'https://www.alphavantage.co/query';

export async function fetchStockData(symbol: string): Promise<any> {
  const url = `${BASE_URL}?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch stock data');
  }
  return response.json();
};

export async function searchStockSymbols(keywords: string): Promise<any> {
  const url = `${BASE_URL}?function=SYMBOL_SEARCH&keywords=${keywords}&apikey=${API_KEY}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to search stock symbols');
  }
  return response.json();
};
