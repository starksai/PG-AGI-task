'use client';

import React, { useEffect, useState } from 'react';
import { fetchWeather, fetchForecast } from '@/services/weatherService';
import { useTheme } from 'next-themes';
import CitySearch from '@/components/weather/CitySearch';
import WeatherInfo from '@/components/weather/WeatherInfo';
import AirConditions from '@/components/weather/AirConditions';
import ForecastChart from '@/components/weather/ForecastChart';

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

const WeatherPage = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);
  const [formattedForecast, setFormattedForecast] = useState<
    { name: string; temperature: number }[]
  >([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchInput, setSearchInput] = useState('');
  const { theme } = useTheme();
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

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white p-4 font-sans transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
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
            <ForecastChart formattedForecast={formattedForecast} />
          </>
        )}
      </div>
    </div>
  );
};

export default WeatherPage;