import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface ChartProps {
  labels: string[];
  data: number[];
  min: number;
  max: number;
  label: string;
  color: string;
  yMin: number;
  yMax: number;
}

const ChartComponent: React.FC<ChartProps> = ({ labels, data, min, max, label, color, yMin, yMax }) => {
  const chartData = {
    labels,
    datasets: [
      {
        label,
        data,
        borderColor: color,
        backgroundColor: color.replace('0.8', '0.2'),
        fill: true,
      },
      {
        label: 'MIN',
        data: Array(labels.length).fill(min),
        borderColor: 'blue',
        borderDash: [5, 5],
        pointRadius: 0,
      },
      {
        label: 'MAX',
        data: Array(labels.length).fill(max),
        borderColor: 'red',
        borderDash: [5, 5],
        pointRadius: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
      title: { display: true, text: label },
    },
    scales: {
      x: { title: { display: true, text: 'Время' } },
      y: {
        title: { display: true, text: label },
        min: yMin,
        max: yMax,
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default ChartComponent;