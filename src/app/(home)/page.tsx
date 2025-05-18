"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

import CitySearch from '@/components/weather/CitySearch';
import WeatherInfo from '@/components/weather/WeatherInfo';
import AirConditions from '@/components/weather/AirConditions';
import { fetchForecast, fetchWeather } from "@/services/weatherService";

import { fetchAllCategories } from "@/services/newsService"

import { fetchStockDaily, fetchStockOverview } from "@/services/financeService";
import StockSelector from "@/components/finance/StockSelector";
import StockInfo from "@/components/finance/StockInfo";
import PriceChart from "@/components/finance/PriceChart";

// Weather interfaces
interface WeatherData {
  name: string;
  main: { temp: number; feels_like: number };
  weather: { description: string }[];
  wind: { speed: number };
  rain?: { '1h': number };
}

interface ForecastData {
  list: { dt: number; temp: { day: number } }[];
}

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  const toggleTheme = () => {
    setIsDarkMode(prev => {
      const newTheme = !prev
      if (newTheme) {
        document.documentElement.classList.add('dark')
        localStorage.setItem('theme', 'dark')
      } else {
        document.documentElement.classList.remove('dark')
        localStorage.setItem('theme', 'light')
      }
      return newTheme
    })
  }

  // Weather useState
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);
  const [formattedForecast, setFormattedForecast] = useState<
    { name: string; temperature: number }[]
  >([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchInput, setSearchInput] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const lastCity = localStorage.getItem('lastCity') || 'Hyderabad';
    handleCitySearch(lastCity);
  }, []);

  useEffect(() => {
    if (forecastData?.list) {
      const formatted = forecastData.list.slice(0, 7).map((day) => {
        const date = new Date(day.dt * 1000);
        return {
          name: date.toLocaleDateString('en-US', { weekday: 'short' }),
          temperature: Math.round(day.temp.day - 273.15), // Kelvin to Celsius
        };
      });
      setFormattedForecast(formatted);
    }
  }, [forecastData]);

  const handleCitySearch = async (city: string) => {
    if (!city) return;
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetchWeather(city);
      const { lat, lon } = res.coord;
      const res1 = await fetchForecast(lat, lon);
      setWeatherData(res);
      setForecastData(res1);
      localStorage.setItem('lastCity', city);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Invalid city name. Showing last known data.');
    }

    setIsLoading(false);
  };

  // Initialize theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark') {
      setIsDarkMode(true)
      document.documentElement.classList.add('dark')
    } else {
      setIsDarkMode(false)
      document.documentElement.classList.remove('dark')
    }
  }, [])

  // News
  interface Article {
    source: { id: string | null; name: string }
    author: string | null
    title: string
    description: string | null
    url: string
    urlToImage: string | null
    publishedAt: string
    content: string | null
  }

  interface NewsResponse {
    status: string
    totalResults: number
    articles: Article[]
  }

  const [loading, setLoading] = useState(true)
  const [newsData, setNewsData] = useState<{ [key: string]: NewsResponse } | null>(null)

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true)
        const res = await fetchAllCategories()
        setNewsData(res)
        setError(null)
      } catch (err) {
        setError("Failed to fetch news. Please try again later.")
      } finally {
        setLoading(false)
      }
    }
    getData()
  }, [])

  // Finance
  const [stockData, setStockData] = useState<any>(null);
  const [stockOverview, setStockOverview] = useState<any>(null);
  const [symbol, setSymbol] = useState<string>("IBM");

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

  const dates = Object.keys(stockData).sort().slice(-30);
  const closingPrices = dates.map(date => parseFloat(stockData[date]["4. close"]));
  const openingPrices = dates.map(date => parseFloat(stockData[date]["1. open"]));
  const volumes = dates.map(date => parseFloat(stockData[date]["5. volume"]) / 1000000);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-6 px-4 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Dashboard Hub</h1>
        </div>

        {/* Weather and Finance Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Weather Card */}
          <div>
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4">Weather</h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <CitySearch
                searchInput={searchInput}
                setSearchInput={setSearchInput}
                handleCitySearch={handleCitySearch}
              />
              {isLoading && (
                <p className="text-center text-gray-500 dark:text-gray-400">
                  Loading weather data...
                </p>
              )}
              {error && <p className="text-center text-red-500">{error}</p>}
              {!isLoading && weatherData && (
                <>
                  <WeatherInfo weatherData={weatherData} />
                  <AirConditions weatherData={weatherData} />
                </>
              )}
            </div>
          </div>

          {/* Finance Card */}
          <div>
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4">Finance</h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <StockSelector stockList={stockList} symbol={symbol} setSymbol={setSymbol} />
              <StockInfo stockOverview={stockOverview} symbol={symbol} />
              <PriceChart dates={dates} closingPrices={closingPrices} openingPrices={openingPrices} volumes={volumes} />
            </div>
          </div>
        </div>

        {/* News Section - Limited to 9 Articles */}
        {!loading && !error && newsData && (
          <div>
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4">Latest News</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(newsData)
                .flatMap(([_, data]) => data.articles)
                .slice(0, 9) // Limit to 9 articles
                .map((article: Article, index: number) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                  >
                    {article.urlToImage && (
                      <img
                        src={article.urlToImage}
                        alt={article.title}
                        className="w-full h-40 sm:h-48 object-cover"
                      />
                    )}
                    <div className="p-4">
                      <h2 className="text-lg font-semibold mb-2 line-clamp-2 text-gray-900 dark:text-white">
                        {article.title}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-300 mb-2 line-clamp-3 text-sm">
                        {article.description || "No description available"}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        By {article.author || "Unknown"} |{" "}
                        {new Date(article.publishedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
            {/* Explore More Button */}
            <div className="mt-6 text-center">
              <Link href="/news">
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Explore More
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Custom Animation for Fade-In */}
      <style jsx>{`
        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease-in-out;
        }
      `}</style>
    </div>
  )
}