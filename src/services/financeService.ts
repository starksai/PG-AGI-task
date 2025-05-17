import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_ALPHA_VANTAGE_KEY;
const BASE_URL = 'https://www.alphavantage.co/query';

export const fetchStockDaily = async (symbol: string) => {
  const response = await axios.get(BASE_URL, {
    params: {
      function: 'TIME_SERIES_DAILY',
      symbol,
      outputsize: 'compact',
      apikey: API_KEY,
    },
  });
  return response.data['Time Series (Daily)'];
};

export const fetchStockOverview = async (symbol: string) => {
  const response = await axios.get(BASE_URL, {
    params: {
      function: 'OVERVIEW',
      symbol,
      apikey: API_KEY,
    },
  });
  return response.data;
};