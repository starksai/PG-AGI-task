
"use client";

import { fetchStockDaily, fetchStockOverview } from "@/services/financeService";
import { useEffect, useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

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
            {/* Dropdown for Stock Selection */}
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

            {/* Stock Info Section */}
            <div className="mb-4 p-3 bg-gray-50 dark:bg-dark-2 rounded-lg shadow">
                <h2 className="text-base font-bold text-gray-900 dark:text-white mb-2">Stock Info</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                    <p className="text-gray-700 dark:text-gray-300"><strong>Symbol:</strong> {symbol}</p>
                    <p className="text-gray-700 dark:text-gray-300"><strong>Name:</strong> {stockOverview.Name}</p>
                    <p className="text-gray-700 dark:text-gray-300"><strong>Sector:</strong> {stockOverview.Sector}</p>
                    <p className="text-gray-700 dark:text-gray-300"><strong>Industry:</strong> {stockOverview.Industry}</p>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex flex-col lg:flex-row gap-4">
                {/* Charts Section */}
                <div className="flex-1 p-3 bg-gray-50 dark:bg-dark-2 rounded-lg shadow">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3 text-sm">
                        <div>
                            <p className="text-gray-700 dark:text-gray-300">Highest Volume Traded: {Math.max(...volumes).toFixed(2)}M</p>
                            <p className="text-gray-700 dark:text-gray-300">Lowest Volume Traded: {Math.min(...volumes).toFixed(2)}M</p>
                        </div>
                        <div>
                            <p className="text-gray-700 dark:text-gray-300">All Time High Price: {selectedHigh.toFixed(2)}</p>
                            <p className="text-gray-700 dark:text-gray-300">All Time Low Price: {selectedLow.toFixed(2)}</p>
                        </div>
                    </div>
                    <h2 className="text-base font-bold text-gray-900 dark:text-white mb-2">Closing VS Opening</h2>
                    <div className="h-48">
                        <Line data={priceChartData} options={priceChartOptions} />
                    </div>
                    <h2 className="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2">Total Volume</h2>
                    <div className="h-48">
                        <Bar data={volumeChartData} options={volumeChartOptions} />
                    </div>
                </div>

                {/* Summary Section */}
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
            </div>
        </div>
    );
}