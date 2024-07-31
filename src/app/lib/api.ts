// src/lib/api.ts
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
const API_KEY = process.env.COINT_API_KEY;
const BASE_URL = 'https://min-api.cryptocompare.com/data';
// fsym = 코인 종류 tsyms = 나라별 화폐
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

// export const fetchDailyBitcoin = async()=>{
// 	try {
// 		const response = await axios.get(`${BASE_URL}/v2/histoday?fsym=BTC&tsym=USD&limit=10`)
// 	}
// }
// fetchBitcoinPrice();
// console.log(fetchBitcoinPrice());
// const testFetch = async () => {
//   try {`/price?fsym=BTC&tsyms=USD`
//     const data = await fetchBitcoinPrice();
//     console.log('Bitcoin Price Data:', data);
//   } catch (error) {
//     console.error('Test Error:', error);
//   }
// };

// testFetch();
export const fetchBitcoinPrice2 = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/v2/histoday?fsym=BTC&tsym=USD&limit=10`, {
      headers: {
        Authorization: `Apikey ${API_KEY}`, // Ensure proper format for API key
      },
    });

    // Return data in JSON format
    return JSON.stringify(response.data);
  } catch (error) {
    // Handle the error and throw a more informative message
    console.error('Error fetching Bitcoin price:', error);
    throw new Error('Error fetching Bitcoin price');
  }
};

const fetchCryptoData = async () => {
  const response = await axios.get('https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD,EUR');
  return response.data;
};

export const useCryptoData = () => {
  return useQuery({
    queryKey: ['cryptoData'],
    queryFn: fetchCryptoData,
    refetchInterval: 5000, // 5초 간격으로 callback 옵션
  });
};
