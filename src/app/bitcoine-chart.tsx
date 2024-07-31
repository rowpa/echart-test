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

// 'use client';
// import React from 'react';
// import ReactECharts from 'echarts-for-react';
// import { useCryptoData } from '../_actions/get-data';

// const PieChart: React.FC = () => {
//   const { data, isLoading, isError } = useCryptoData();

//   if (isLoading) return <div>Loading...</div>;
//   if (isError) return <div>Error fetching data</div>;

//   const options = {
//     title: {
//       text: 'Crypto Prices',
//       subtext: 'Distribution of Prices',
//       left: 'center',
//     },
//     tooltip: {
//       trigger: 'item',
//     },
//     legend: {
//       orient: 'vertical',
//       left: 'left',
//     },
//     series: [
//       {
//         name: 'Price',
//         type: 'pie',
//         radius: '70%',
//         data: [
//           { value: data.USD, name: 'USD' },
//           { value: data.EUR, name: 'EUR' },
//         ],
//         emphasis: {
//           itemStyle: {
//             shadowBlur: 10,
//             shadowOffsetX: 0,
//             shadowColor: 'rgba(0, 0, 0, 0.5)',
//           },
//         },
//       },
//     ],
//   };

//   return (
//     <div>
//       {data && !isLoading && (
//         <div>
//           <p className="text">{'USD' + data.USD}</p>
//           <p>{'EUR' + data.EUR}</p>
//         </div>
//       )}
//       <ReactECharts option={options} />
//     </div>
//   );
// };

// export default PieChart;
