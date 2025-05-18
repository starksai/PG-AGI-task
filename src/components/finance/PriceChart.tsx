import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface PriceChartProps {
  dates: string[];
  closingPrices: number[];
  openingPrices: number[];
  volumes: number[];
}

export default function PriceChart({ dates, closingPrices, openingPrices, volumes }: PriceChartProps) {
  const priceChartData = {
    labels: dates,
    datasets: [
      {
        label: 'Closing',
        data: closingPrices,
        borderColor: '#3b82f6',
        backgroundColor: '#3b82f6',
        yAxisID: 'y',
        type: 'line' as const,
      },
      {
        label: 'Opening',
        data: openingPrices,
        borderColor: '#ef4444',
        backgroundColor: '#ef4444',
        yAxisID: 'y',
        type: 'line' as const,
      },
      {
        label: 'Volume',
        data: volumes,
        backgroundColor: '#22c55e',
        yAxisID: 'y1',
        type: 'line' as const,
      },
    ],
  };

  const priceChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    scales: {
      y: {
        type: 'linear' as const,
        position: 'left' as const,
        title: { display: true, text: 'Price' },
        ticks: { font: { size: 10 } },
      },
      y1: {
        type: 'linear' as const,
        position: 'right' as const,
        title: { display: true, text: 'Volume (M)' },
        grid: { drawOnChartArea: false },
        ticks: { font: { size: 10 } },
      },
      x: {
        ticks: { font: { size: 10 }, maxRotation: 45, minRotation: 45 },
      },
    },
    plugins: {
      legend: { labels: { font: { size: 10 } } },
      title: { font: { size: 12 } },
    },
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3 text-sm">
        <div>
          <p className="text-gray-700 dark:text-gray-300">Highest Volume Traded: {Math.max(...volumes).toFixed(2)}M</p>
          <p className="text-gray-700 dark:text-gray-300">Lowest Volume Traded: {Math.min(...volumes).toFixed(2)}M</p>
        </div>
        <div>
          <p className="text-gray-700 dark:text-gray-300">All Time High Price: {Math.max(...closingPrices).toFixed(2)}</p>
          <p className="text-gray-700 dark:text-gray-300">All Time Low Price: {Math.min(...closingPrices).toFixed(2)}</p>
        </div>
      </div>
      <h2 className="text-base font-bold text-gray-900 dark:text-white mb-2">Closing VS Opening</h2>
      <div className="h-48">
        <Line data={priceChartData} options={priceChartOptions} />
      </div>
    </>
  );
}