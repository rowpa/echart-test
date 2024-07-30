// src/lib/api.ts
import axios from 'axios';

const API_KEY = process.env.COINT_API_KEY;
const BASE_URL = 'https://min-api.cryptocompare.com/data';

export const fetchBitcoinPrice = async (): Promise<{ USD: number }> => {
  try {
    const response = await axios.get(`${BASE_URL}/price?fsym=BTC&tsyms=USD`, {
      headers: {
        Authorization: `Apikey ${API_KEY}`, // Ensure proper format for API key
      },
    });

    // Return data in JSON format
    return response.data;
  } catch (error) {
    // Handle the error and throw a more informative message
    console.error('Error fetching Bitcoin price:', error);
    throw new Error('Error fetching Bitcoin price');
  }
};

// fetchBitcoinPrice();
// console.log(fetchBitcoinPrice());
const testFetch = async () => {
  try {
    const data = await fetchBitcoinPrice();
    console.log('Bitcoin Price Data:', data);
  } catch (error) {
    console.error('Test Error:', error);
  }
};

testFetch();
