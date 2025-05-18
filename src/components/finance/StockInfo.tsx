interface StockInfoProps {
  stockOverview: any;
  symbol: string;
}

export default function StockInfo({ stockOverview, symbol }: StockInfoProps) {
  return (
    <div className="mb-4 p-3 bg-gray-50 dark:bg-dark-2 rounded-lg shadow">
      <h2 className="text-base font-bold text-gray-900 dark:text-white mb-2">Stock Info</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
        <p className="text-gray-700 dark:text-gray-300"><strong>Symbol:</strong> {symbol}</p>
        <p className="text-gray-700 dark:text-gray-300"><strong>Name:</strong> {stockOverview.Name}</p>
        <p className="text-gray-700 dark:text-gray-300"><strong>Sector:</strong> {stockOverview.Sector}</p>
        <p className="text-gray-700 dark:text-gray-300"><strong>Industry:</strong> {stockOverview.Industry}</p>
      </div>
    </div>
  );
}