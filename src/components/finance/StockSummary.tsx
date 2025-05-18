interface StockSummaryProps {
  last7DaysVolume: number;
  last30DaysVolume: number;
  selectedVolume: number;
  last7DaysHigh: number;
  last30DaysHigh: number;
  selectedHigh: number;
  last7DaysLow: number;
  last30DaysLow: number;
  selectedLow: number;
  last7DaysClose: number;
  last30DaysClose: number;
  selectedClose: number;
}

export default function StockSummary({
  last7DaysVolume,
  last30DaysVolume,
  selectedVolume,
  last7DaysHigh,
  last30DaysHigh,
  selectedHigh,
  last7DaysLow,
  last30DaysLow,
  selectedLow,
  last7DaysClose,
  last30DaysClose,
  selectedClose,
}: StockSummaryProps) {
  return (
    <div className="w-full lg:w-80 p-3 bg-gray-50 dark:bg-dark-2 rounded-lg shadow">
      <h2 className="text-base font-bold text-gray-900 dark:text-white mb-3">Stocks Summary</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b dark:border-dark-3">
              <th className="p-1 text-gray-900 dark:text-white">Description</th>
              <th className="p-1 text-gray-900 dark:text-white">Last 7 Days</th>
              <th className="p-1 text-gray-900 dark:text-white">Last 30 Days</th>
              <th className="p-1 text-gray-900 dark:text-white">Selected</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b dark:border-dark-3">
              <td className="p-1 text-gray-700 dark:text-gray-300">Volume</td>
              <td className="p-1 text-gray-700 dark:text-gray-300">{last7DaysVolume.toFixed(2)}M</td>
              <td className="p-1 text-gray-700 dark:text-gray-300">{last30DaysVolume.toFixed(2)}M</td>
              <td className="p-1 text-gray-700 dark:text-gray-300">{selectedVolume.toFixed(2)}M</td>
            </tr>
            <tr className="border-b dark:border-dark-3">
              <td className="p-1 text-gray-700 dark:text-gray-300">High Price</td>
              <td className="p-1 text-gray-700 dark:text-gray-300">{last7DaysHigh.toFixed(2)}</td>
              <td className="p-1 text-gray-700 dark:text-gray-300">{last30DaysHigh.toFixed(2)}</td>
              <td className="p-1 text-gray-700 dark:text-gray-300">{selectedHigh.toFixed(2)}</td>
            </tr>
            <tr className="border-b dark:border-dark-3">
              <td className="p-1 text-gray-700 dark:text-gray-300">Low Price</td>
              <td className="p-1 text-gray-700 dark:text-gray-300">{last7DaysLow.toFixed(2)}</td>
              <td className="p-1 text-gray-700 dark:text-gray-300">{last30DaysLow.toFixed(2)}</td>
              <td className="p-1 text-gray-700 dark:text-gray-300">{selectedLow.toFixed(2)}</td>
            </tr>
            <tr>
              <td className="p-1 text-gray-700 dark:text-gray-300">Closing Price</td>
              <td className="p-1 text-gray-700 dark:text-gray-300">{last7DaysClose.toFixed(2)}</td>
              <td className="p-1 text-gray-700 dark:text-gray-300">{last30DaysClose.toFixed(2)}</td>
              <td className="p-1 text-green-600 dark:text-green-500">{selectedClose.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}