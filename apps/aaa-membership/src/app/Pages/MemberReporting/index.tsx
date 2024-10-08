import {
  BarController,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import 'chartjs-plugin-datalabels';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  ChartDataLabels
);

interface IDataItem {
  year: number;
  month: number;
  name: string;
  count: number;
}

export const MemberReporting = (): JSX.Element => {
  const barDataList: IDataItem[] = [
    { name: 'Dev 2023', year: 2023, month: 11, count: 16 },
    { name: 'Jan 2024', year: 2024, month: 0, count: 16 },
    { name: 'Feb 2024', year: 2024, month: 1, count: 6 },
    { name: 'Mar 2024', year: 2024, month: 2, count: 26 },
    { name: 'Apr 2024', year: 2024, month: 3, count: 10 },
    { name: 'May 2024', year: 2024, month: 4, count: 11 },
    { name: 'Jun 2024', year: 2024, month: 5, count: 22 },
    { name: 'Jul 2024', year: 2024, month: 6, count: 30 },
    { name: 'Aug 2024', year: 2024, month: 7, count: 5 },
    { name: 'Sep 2024', year: 2024, month: 8, count: 21 },
    { name: 'Oct 2024', year: 2024, month: 9, count: 11 },
  ];

  const COLOURS = [
    '#E69F00',
    '#56B4E9',
    '#009E73',
    '#F0E442',
    '#0072B2',
    '#D55E00',
    '#CC79A7',
  ];
  const data = {
    labels: barDataList.map((x) => x.name),
    datasets: [
      {
        label: 'Membership status', //barDate.map((x: IAffiliateRenewBarChartDateItem) => x.label),
        data: barDataList.map((x) => x.count),
        backgroundColor: barDataList.map((x, idx) => COLOURS[idx % 7]),
      },
    ],
  };

  const options = {
    responsive: true,
  
    plugins: {
      title: {
        display: true,
        text: 'Membership status',
        font: {
          size: 20,
          weight: 600,
          lineHeight: 1.2,
        },
      },
      legend: {
        display: false,
      },
      datalabels: {
        display: true,
        color: 'white',
        font: {
          size: 20,
          weight: 600,
          lineHeight: 1.2,
        },
        padding: {
          right: 0,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,

        // ticks: {
        //   callback: function (value: any) {
        //     return value;
        //   },
        // },
      },
    },
  };

  return (
    <div>
      <Bar data={data} options={options} width="800px" height="420px" />
    </div>
  );
};
