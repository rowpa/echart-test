'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchBitcoinPrice } from './lib/api';
import ReactECharts from 'echarts-for-react';

const BitcoinChart = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['bitcoinPrice'],
    queryFn: fetchBitcoinPrice,
  });

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
