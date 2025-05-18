"use client";

import { fetchStockDaily, fetchStockOverview } from "@/services/financeService";
import { useEffect, useState } from "react";
import StockSelector from "@/components/finance/StockSelector";
import StockInfo from "@/components/finance/StockInfo";
import PriceChart from "@/components/finance/PriceChart";
import VolumeChart from "@/components/finance/VolumeChart";
import StockSummary from "@/components/finance/StockSummary";

export default function FinanceDashboard() {
  const [stockData, setStockData] = useState<any>(null);
  const [stockOverview, setStockOverview] = useState<any>(null);
  const [symbol, setSymbol] = useState<string>("IBM");

  // Predefined list of stocks
  const stockList = [
    { symbol: "IBM", name: "International Business Machines" },
    { symbol: "AAPL", name: "Apple Inc." },
    { symbol: "GOOGL", name: "Alphabet Inc." },
    { symbol: "MSFT", name: "Microsoft Corporation" },
    { symbol: "AMZN", name: "Amazon.com Inc." },
    { symbol: "TSLA", name: "Tesla Inc." },
    { symbol: "META", name: "Meta Platforms Inc." },
  ];

  useEffect(() => {
    async function getData() {
      try {
        let res = await fetchStockDaily(symbol);
        let res1 = await fetchStockOverview(symbol);
        setStockData(res);
        setStockOverview(res1);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    getData();
  }, [symbol]);

  if (!stockData || !stockOverview) return <div className="p-4 text-gray-900 dark:text-white">Loading...</div>;

  // Process data for charts and summaries
  const dates = Object.keys(stockData).sort().slice(-30);
  const closingPrices = dates.map(date => parseFloat(stockData[date]["4. close"]));
  const openingPrices = dates.map(date => parseFloat(stockData[date]["1. open"]));
  const volumes = dates.map(date => parseFloat(stockData[date]["5. volume"]) / 1000000);

  // Calculate summaries
  const last7Days = dates.slice(-7);
  const last7DaysVolume = last7Days.reduce((sum, date) => sum + parseFloat(stockData[date]["5. volume"]), 0) / 1000000;
  const last30DaysVolume = dates.reduce((sum, date) => sum + parseFloat(stockData[date]["5. volume"]), 0) / 1000000;
  const selectedVolume = last30DaysVolume;

  const last7DaysHigh = Math.max(...last7Days.map(date => parseFloat(stockData[date]["2. high"])));
  const last30DaysHigh = Math.max(...dates.map(date => parseFloat(stockData[date]["2. high"])));
  const selectedHigh = parseFloat(stockOverview["52WeekHigh"]);

  const last7DaysLow = Math.min(...last7Days.map(date => parseFloat(stockData[date]["3. low"])));
  const last30DaysLow = Math.min(...dates.map(date => parseFloat(stockData[date]["3. low"])));
  const selectedLow = parseFloat(stockOverview["52WeekLow"]);

  const last7DaysClose = parseFloat(stockData[last7Days[last7Days.length - 1]]["4. close"]);
  const last30DaysClose = parseFloat(stockData[dates[dates.length - 1]]["4. close"]);
  const selectedClose = last30DaysClose;

  return (
    <div className="p-4 md:p-6 bg-white dark:bg-gray-dark min-h-screen">
      <StockSelector stockList={stockList} symbol={symbol} setSymbol={setSymbol} />
      <StockInfo stockOverview={stockOverview} symbol={symbol} />
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 p-3 bg-gray-50 dark:bg-dark-2 rounded-lg shadow">
          <PriceChart dates={dates} closingPrices={closingPrices} openingPrices={openingPrices} volumes={volumes} />
          <VolumeChart dates={dates} volumes={volumes} />
        </div>
        <StockSummary
          last7DaysVolume={last7DaysVolume}
          last30DaysVolume={last30DaysVolume}
          selectedVolume={selectedVolume}
          last7DaysHigh={last7DaysHigh}
          last30DaysHigh={last30DaysHigh}
          selectedHigh={selectedHigh}
          last7DaysLow={last7DaysLow}
          last30DaysLow={last30DaysLow}
          selectedLow={selectedLow}
          last7DaysClose={last7DaysClose}
          last30DaysClose={last30DaysClose}
          selectedClose={selectedClose}
        />
      </div>
    </div>
  );
}