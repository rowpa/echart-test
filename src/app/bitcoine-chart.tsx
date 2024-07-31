'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchBitcoinPrice, fetchBitcoinPrice2 } from './lib/api';
import ReactECharts from 'echarts-for-react';

const BitcoinChart = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['bitcoinPrice'],
    queryFn: fetchBitcoinPrice,
  });
  // console.log(data);
  const { data: deailydata } = useQuery({
    queryKey: ['bitcoinPrice2'],
    queryFn: fetchBitcoinPrice2,
  });

  // console.log(deailydata);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;

  const options = {
    title: {
      text: 'Bitcoin Price',
      subtext: 'Price of Bitcoin as of today',
    },
    tooltip: {},
    xAxis: {
      type: 'category',
      data: ['Bitcoin'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: 'Price',
        type: 'bar',
        data: [data?.USD ?? 0], // Use optional chaining and fallback value
      },
    ],
  };

  return (
    <div>
      <h1>Bitcoin Price Chart</h1>
      <ReactECharts option={options} />
    </div>
  );
};

export default BitcoinChart;
