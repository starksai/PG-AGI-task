interface Stock {
  symbol: string;
  name: string;
}

interface StockSelectorProps {
  stockList: Stock[];
  symbol: string;
  setSymbol: (symbol: string) => void;
}

export default function StockSelector({ stockList, symbol, setSymbol }: StockSelectorProps) {
  return (
    <div className="mb-4">
      <select
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
        className="w-full max-w-xs p-2 rounded border bg-gray-2 text-sm outline-none transition-colors focus-visible:border-primary dark:border-dark-3 dark:bg-dark-2 dark:hover:border-dark-4 dark:hover:bg-dark-3 dark:focus-visible:border-primary"
      >
        {stockList.map((stock) => (
          <option key={stock.symbol} value={stock.symbol}>
            {stock.name} ({stock.symbol})
          </option>
        ))}
      </select>
    </div>
  );
}