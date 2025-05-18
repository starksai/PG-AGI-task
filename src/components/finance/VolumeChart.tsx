import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface VolumeChartProps {
  dates: string[];
  volumes: number[];
}

export default function VolumeChart({ dates, volumes }: VolumeChartProps) {
  const volumeChartData = {
    labels: dates,
    datasets: [
      {
        label: 'Total Volume',
        data: volumes,
        backgroundColor: '#3b82f6',
      },
    ],
  };

  const volumeChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { ticks: { font: { size: 10 }, maxRotation: 45, minRotation: 45 } },
      y: { ticks: { font: { size: 10 } } },
    },
    plugins: {
      legend: { labels: { font: { size: 10 } } },
      title: { font: { size: 12 } },
    },
  };

  return (
    <>
      <h2 className="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2">Total Volume</h2>
      <div className="h-48">
        <Bar data={volumeChartData} options={volumeChartOptions} />
      </div>
    </>
  );
}