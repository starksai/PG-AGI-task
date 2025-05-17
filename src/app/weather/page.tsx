// "use client"

// // import { fetchWeather, fetchForecast } from '@/services/weatherService'
// // import React, { useEffect, useState } from 'react'

// // const WeatherPage = () => {

// //     const [weatherData, setWeatherData] = useState<any>(null);
// //     const [forecastData, setForecastData] = useState<any>(null);


// //     useEffect(() => {

// //         async function getData() {

// //             // let res = await fetchWeather("hyderabad")
// //             let res1 = await fetchForecast(17.3753, 78.4744)
// //             // setWeatherData(res)
// //             setForecastData(res1)
// //         }

// //         getData()
// //     }, [])



// //     console.log(weatherData);
// //     console.log(forecastData);


// //     return (
// //         <div>WeatherPage  now i changed</div>
// //     )
// // }

// // export default WeatherPage;

// import React, { useEffect, useState } from 'react';
// import { fetchWeather, fetchForecast } from '@/services/weatherService';
// import Image from 'next/image';

// const WeatherPage = () => {
//   const [weatherData, setWeatherData] = useState<any>(null);
//   const [forecastData, setForecastData] = useState<any>(null);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     async function getData() {
//       try {
//         const res = await fetchWeather('hyderabad');
//         const res1 = await fetchForecast(17.3753, 78.4744);
//         setWeatherData(res);
//         setForecastData(res1);
//         setError(null);
//       } catch (err) {
//         console.error('Error fetching data:', err);
//         setError('Failed to fetch weather data.');
//       }
//     }

//     getData();
//   }, []);

//   return (
//     <div className="min-h-screen bg-white text-black p-4 font-sans">
//       <div className="max-w-5xl mx-auto">
//         <input
//           type="text"
//           placeholder="Search for cities"
//           className="w-full p-3 border border-gray-300 rounded mb-6 shadow-sm"
//         />

//         {error && <p className="text-red-500">{error}</p>}

//         {weatherData && (
//           <div>
//             <div className="flex items-center justify-between mb-6">
//               <div>
//                 <h1 className="text-3xl font-bold">{weatherData.name}</h1>
//                 <p>Chance of rain: {weatherData.rain ? weatherData.rain['1h'] || 0 : 0}%</p>
//                 <p className="text-2xl">{Math.round(weatherData.main.temp)}°</p>
//               </div>
//               {/* <Image src="/sun.png" alt="Weather Icon" width={100} height={100} /> */}
//             </div>

//             <div className="bg-gray-100 rounded p-4 mb-6">
//               <div className="grid grid-cols-6 gap-4 text-center">
//                 {[...Array(6)].map((_, i) => (
//                   <div key={i}>
//                     <p>6:00 AM</p>
//                     <p>🌤</p>
//                     <p>{Math.round(weatherData.main.temp)}°</p>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="bg-gray-100 rounded p-4 mb-6">
//               <h2 className="font-semibold mb-2">AIR CONDITION</h2>
//               <div className="grid grid-cols-2 gap-4">
//                 <p>🌡 Real Feel: {Math.round(weatherData.main.feels_like)}°</p>
//                 <p>💨 Wind: {weatherData.wind.speed} KM/H</p>
//                 <p>🌧 Chance of Rain: 0%</p>
//                 <p>☀️ UV Index: 3</p>
//               </div>
//               <button className="bg-blue-500 text-white px-4 py-1 rounded mt-2">See More</button>
//             </div>

//             {forecastData && forecastData.list && (
//               <div className="bg-gray-100 rounded p-4">
//                 <h2 className="font-semibold mb-2">7-day FORECAST</h2>
//                 <div className="space-y-2">
//                   {forecastData.list.slice(0, 7).map((item: any, index: number) => (
//                     <div key={index} className="flex justify-between items-center border-b pb-2">
//                       <p>Today</p>
//                       <p>☀️</p>
//                       <p>
//                         {Math.round(item.temp.max)}/{Math.round(item.temp.min)}°
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default WeatherPage;

// "use client";

// import React, { useEffect, useState } from "react";
// import { fetchWeather, fetchForecast } from "@/services/weatherService";

// const WeatherPage = () => {
//     const [weatherData, setWeatherData] = useState<any>(null);
//     const [forecastData, setForecastData] = useState<any>(null);
//     const [error, setError] = useState<string | null>(null);
//     const [hasMounted, setHasMounted] = useState(false);

//     // Delay rendering until client is mounted
//     useEffect(() => {
//         setHasMounted(true);

//         async function getData() {
//             try {
//                 const res = await fetchWeather("hyderabad");
//                 const res1 = await fetchForecast(17.3753, 78.4744);
//                 setWeatherData(res);
//                 setForecastData(res1);
//                 setError(null);
//             } catch (err) {
//                 console.error("Error fetching data:", err);
//                 setError("Failed to fetch weather data.");
//             }
//         }

//         getData();
//     }, []);

//     // Avoid hydration mismatch by not rendering until mounted
//     if (!hasMounted) return null;

//     return (
//         <div className="min-h-screen bg-white text-black p-4 font-sans">
//             <div className="max-w-5xl mx-auto">
//                 <input
//                     type="text"
//                     placeholder="Search for cities"
//                     className="w-full p-3 border border-gray-300 rounded mb-6 shadow-sm"
//                 />

//                 {error && <p className="text-red-500">{error}</p>}

//                 {weatherData && (
//                     <div>
//                         <div className="flex items-center justify-between mb-6">
//                             <div>
//                                 <h1 className="text-3xl font-bold">{weatherData.name}</h1>
//                                 <p>
//                                     Chance of rain:{" "}
//                                     {weatherData.rain ? weatherData.rain["1h"] || 0 : 0}%
//                                 </p>
//                                 <p className="text-2xl">
//                                     {Math.round(weatherData.main.temp)}°
//                                 </p>
//                             </div>
//                         </div>

//                         <div className="bg-gray-100 rounded p-4 mb-6">
//                             <div className="grid grid-cols-6 gap-4 text-center">
//                                 {[...Array(6)].map((_, i) => (
//                                     <div key={i}>
//                                         <p>6:00 AM</p>
//                                         <p>🌤</p>
//                                         <p>{Math.round(weatherData.main.temp)}°</p>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>

//                         <div className="bg-gray-100 rounded p-4 mb-6">
//                             <h2 className="font-semibold mb-2">AIR CONDITION</h2>
//                             <div className="grid grid-cols-2 gap-4">
//                                 <p>🌡 Real Feel: {Math.round(weatherData.main.feels_like)}°</p>
//                                 <p>💨 Wind: {weatherData.wind.speed} KM/H</p>
//                                 <p>🌧 Chance of Rain: 0%</p>
//                                 <p>☀️ UV Index: 3</p>
//                             </div>
//                             <button className="bg-blue-500 text-white px-4 py-1 rounded mt-2">
//                                 See More
//                             </button>
//                         </div>

//                         {forecastData && forecastData.list && (
//                             <div className="bg-gray-100 rounded p-4">
//                                 <h2 className="font-semibold mb-2">7-day FORECAST</h2>
//                                 <div className="space-y-2">
//                                     {forecastData.list.slice(0, 7).map((item: any, index: number) => (
//                                         <div
//                                             key={index}
//                                             className="flex justify-between items-center border-b pb-2"
//                                         >
//                                             <p>Today</p>
//                                             <p>☀️</p>
//                                             <p>
//                                                 {Math.round(item.temp.max)}/{Math.round(item.temp.min)}°
//                                             </p>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default WeatherPage;


// "use client";

// import React, { useEffect, useState } from 'react';
// import { fetchWeather, fetchForecast } from '@/services/weatherService';
// import { useTheme } from 'next-themes';

// const WeatherPage = () => {
//   const [weatherData, setWeatherData] = useState<any>(null);
//   const [forecastData, setForecastData] = useState<any>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const { theme, setTheme } = useTheme();
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true); // Prevent hydration mismatch

//     async function getData() {
//       setIsLoading(true);
//       try {
//         const res = await fetchWeather('hyderabad');
//         const res1 = await fetchForecast(17.3753, 78.4744);
//         setWeatherData(res);
//         setForecastData(res1);
//         setError(null);
//       } catch (err) {
//         console.error('Error fetching data:', err);
//         setError('Failed to fetch weather data.');
//       }
//       setIsLoading(false);
//     }

//     getData();
//   }, []);

//   console.log(weatherData);
//   console.log(forecastData);



//   if (!mounted) return null;

//   return (
//     <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white p-4 font-sans transition-colors duration-300">
//       <div className="max-w-5xl mx-auto">
//         {/* Toggle for Light/Dark Mode */}
//         {/* <div className="flex justify-end mb-4">
//           <button
//             onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
//             className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition"
//           >
//             {theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
//           </button>
//         </div> */}

//         {/* Search Input (no functionality yet) */}
//         <input
//           type="text"
//           placeholder="Search for cities"
//           className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded mb-6 shadow-sm bg-white dark:bg-gray-800 text-black dark:text-white"
//         />

//         {/* Loading */}
//         {isLoading && (
//           <p className="text-center text-gray-500 dark:text-gray-400">Loading weather data...</p>
//         )}

//         {/* Error */}
//         {error && (
//           <p className="text-center text-red-500">{error}</p>
//         )}

//         {/* Weather Display */}
//         {!isLoading && weatherData && (
//           <>
//             <div className="flex items-center justify-between mb-6">
//               <div>
//                 <h1 className="text-3xl font-bold">{weatherData.name}</h1>
//                 <p>Chance of rain: {weatherData.rain ? weatherData.rain['1h'] || 0 : 0}%</p>
//                 <p className="text-2xl">{Math.round(weatherData.main.temp)}°</p>
//               </div>
//             </div>

//             {/* Hourly Forecast Mock */}
//             <div className="bg-gray-100 dark:bg-gray-800 rounded p-4 mb-6">
//               <div className="grid grid-cols-6 gap-4 text-center">
//                 {[...Array(6)].map((_, i) => (
//                   <div key={i}>
//                     <p>6:00 AM</p>
//                     <p>🌤</p>
//                     <p>{Math.round(weatherData.main.temp)}°</p>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Air Conditions */}
//             <div className="bg-gray-100 dark:bg-gray-800 rounded p-4 mb-6">
//               <h2 className="font-semibold mb-2">AIR CONDITION</h2>
//               <div className="grid grid-cols-2 gap-4">
//                 <p>🌡 Real Feel: {Math.round(weatherData.main.feels_like)}°</p>
//                 <p>💨 Wind: {weatherData.wind.speed} KM/H</p>
//                 <p>🌧 Chance of Rain: 0%</p>
//                 <p>☀️ UV Index: 3</p>
//               </div>
//               <button className="bg-blue-500 text-white px-4 py-1 rounded mt-2 hover:bg-blue-600">See More</button>
//             </div>

//             {/* 7-Day Forecast */}
//             {forecastData && forecastData.list && (
//               <div className="bg-gray-100 dark:bg-gray-800 rounded p-4">
//                 <h2 className="font-semibold mb-2">7-day FORECAST</h2>
//                 <div className="space-y-2">
//                   {forecastData.list.slice(0, 7).map((item: any, index: number) => (
//                     <div key={index} className="flex justify-between items-center border-b border-gray-300 dark:border-gray-700 pb-2">
//                       <p>Today</p>
//                       <p>☀️</p>
//                       <p>
//                         {Math.round(item.temp.max)}/{Math.round(item.temp.min)}°
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default WeatherPage;



// 'use client';

// import React, { useEffect, useState } from 'react';
// import { fetchWeather, fetchForecast } from '@/services/weatherService';
// import { useTheme } from 'next-themes';

// const WeatherPage = () => {
//     const [weatherData, setWeatherData] = useState<any>(null);
//     const [forecastData, setForecastData] = useState<any>(null);
//     const [error, setError] = useState<string | null>(null);
//     const [isLoading, setIsLoading] = useState<boolean>(true);
//     const [searchInput, setSearchInput] = useState(''); // <- user input
//     const { theme, setTheme } = useTheme();
//     const [mounted, setMounted] = useState(false);

//     useEffect(() => {
//         setMounted(true);
//         handleCitySearch('Hyderabad'); // <- Default city
//     }, []);

//     //   console.log(weatherData);


//     const handleCitySearch = async (city: string) => {
//         if (!city) return;
//         setIsLoading(true);
//         setError(null);
//         try {
//             const res = await fetchWeather(city);
//             const { lat, lon } = res.coord;
//             const res1 = await fetchForecast(lat, lon);
//             setWeatherData(res);
//             setForecastData(res1);
//             setError(null);
//         } catch (err) {
//             console.error('Error fetching data:', err);
//             setWeatherData(null);
//             setForecastData(null);
//             setError('City not found');
//         }
//         setIsLoading(false);
//     };

//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         handleCitySearch(searchInput.trim());
//     };

//     if (!mounted) return null;

//     return (
//         <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white p-4 font-sans transition-colors duration-300">
//             <div className="max-w-5xl mx-auto">

//                 {/* Search Input */}
//                 <form onSubmit={handleSubmit} className="flex mb-6 gap-2">
//                     <input
//                         type="text"
//                         value={searchInput}
//                         onChange={(e) => setSearchInput(e.target.value)}
//                         placeholder="Search for cities"
//                         className="flex-grow p-3 border border-gray-300 dark:border-gray-700 rounded shadow-sm bg-white dark:bg-gray-800 text-black dark:text-white"
//                     />
//                     <button
//                         type="submit"
//                         className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
//                     >
//                         Search
//                     </button>
//                 </form>

//                 {/* Loading */}
//                 {isLoading && <p className="text-center text-gray-500 dark:text-gray-400">Loading weather data...</p>}

//                 {/* Error */}
//                 {error && <p className="text-center text-red-500">{error}</p>}

//                 {/* Weather Display */}
//                 {!isLoading && weatherData && (
//                     <>
//                         <div className="flex items-center justify-between mb-6">
//                             <div>
//                                 <h1 className="text-3xl font-bold">{weatherData.name}</h1>
//                                 <p>Chance of rain: {weatherData.rain ? weatherData.rain['1h'] || 0 : 0}%</p>
//                                 <p className="text-2xl">{Math.round(weatherData.main.temp)}°</p>
//                             </div>
//                         </div>



//                         {/* Air Conditions */}
//                         <div className="bg-gray-100 dark:bg-gray-800 rounded p-4 mb-6">
//                             <h2 className="font-semibold mb-2">AIR CONDITION</h2>
//                             <div className="grid grid-cols-2 gap-4">
//                                 <p>🌡 Real Feel: {Math.round(weatherData.main.feels_like)}°</p>
//                                 <p>💨 Wind: {weatherData.wind.speed} KM/H</p>
//                                 <p>🌧 Chance of Rain: 0%</p>
//                                 <p>☀️ UV Index: 3</p>
//                             </div>
//                             <button className="bg-blue-500 text-white px-4 py-1 rounded mt-2 hover:bg-blue-600">See More</button>
//                         </div>


//                     </>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default WeatherPage;


// 'use client';

// import React, { useEffect, useState } from 'react';
// import { fetchWeather, fetchForecast } from '@/services/weatherService';
// import { useTheme } from 'next-themes';

// const WeatherPage = () => {
//     const [weatherData, setWeatherData] = useState<any>(null);
//     const [forecastData, setForecastData] = useState<any>(null);
//     const [error, setError] = useState<string | null>(null);
//     const [isLoading, setIsLoading] = useState<boolean>(true);
//     const [searchInput, setSearchInput] = useState('');
//     const { theme, setTheme } = useTheme();
//     const [mounted, setMounted] = useState(false);

//     useEffect(() => {
//         setMounted(true);
//         const lastCity = localStorage.getItem('lastCity') || 'Hyderabad';
//         handleCitySearch(lastCity);
//     }, []);

//     const handleCitySearch = async (city: string) => {
//         if (!city) return;
//         setIsLoading(true);
//         setError(null);

//         try {
//             const res = await fetchWeather(city);
//             const { lat, lon } = res.coord;
//             const res1 = await fetchForecast(lat, lon);

//             setWeatherData(res);
//             setForecastData(res1);
//             setError(null);

//             // Save to localStorage only on successful fetch
//             localStorage.setItem('lastCity', city);
//         } catch (err) {
//             console.error('Error fetching data:', err);
//             setError('Invalid city name. Showing last known data.');
//             // Don't clear existing data
//         }

//         setIsLoading(false);
//     };

//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         handleCitySearch(searchInput.trim());
//     };

//     if (!mounted) return null;

//     return (
//         <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white p-4 font-sans transition-colors duration-300">
//             <div className="max-w-5xl mx-auto">

//                 {/* Search Input */}
//                 <form onSubmit={handleSubmit} className="flex mb-6 gap-2">
//                     <input
//                         type="text"
//                         value={searchInput}
//                         onChange={(e) => setSearchInput(e.target.value)}
//                         placeholder="Search for cities"
//                         className="flex-grow p-3 border border-gray-300 dark:border-gray-700 rounded shadow-sm bg-white dark:bg-gray-800 text-black dark:text-white"
//                     />
//                     <button
//                         type="submit"
//                         className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
//                     >
//                         Search
//                     </button>
//                 </form>

//                 {/* Loading */}
//                 {isLoading && <p className="text-center text-gray-500 dark:text-gray-400">Loading weather data...</p>}

//                 {/* Error */}
//                 {error && <p className="text-center text-red-500">{error}</p>}

//                 {/* Weather Display */}
//                 {!isLoading && weatherData && (
//                     <>
//                         <div className="flex items-center justify-between mb-6">
//                             <div>
//                                 <h1 className="text-3xl font-bold">{weatherData.name}</h1>
//                                 <p>Chance of rain: {weatherData.rain ? weatherData.rain['1h'] || 0 : 0}%</p>
//                                 <p className="text-2xl">{Math.round(weatherData.main.temp)}°</p>
//                             </div>
//                         </div>

//                         {/* Air Conditions */}
//                         <div className="bg-gray-100 dark:bg-gray-800 rounded p-4 mb-6">
//                             <h2 className="font-semibold mb-2">AIR CONDITION</h2>
//                             <div className="grid grid-cols-2 gap-4">
//                                 <p>🌡 Real Feel: {Math.round(weatherData.main.feels_like)}°</p>
//                                 <p>💨 Wind: {weatherData.wind.speed} KM/H</p>
//                                 <p>🌧 Chance of Rain: 0%</p>
//                                 <p>☀️ UV Index: 3</p>
//                             </div>
//                             <button className="bg-blue-500 text-white px-4 py-1 rounded mt-2 hover:bg-blue-600">See More</button>
//                         </div>
//                     </>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default WeatherPage;


// 'use client';

// import React, { useEffect, useState } from 'react';
// import { fetchWeather, fetchForecast } from '@/services/weatherService';
// import { useTheme } from 'next-themes';
// import {
//     ResponsiveContainer,
//     ComposedChart,
//     XAxis,
//     YAxis,
//     Tooltip,
//     Legend,
//     Bar,
//     Line,
//     CartesianGrid
// } from 'recharts';

// const WeatherPage = () => {
//     const [weatherData, setWeatherData] = useState<any>(null);
//     const [forecastData, setForecastData] = useState<any>(null);
//     const [formattedForecast, setFormattedForecast] = useState<any[]>([]);
//     const [error, setError] = useState<string | null>(null);
//     const [isLoading, setIsLoading] = useState<boolean>(true);
//     const [searchInput, setSearchInput] = useState('');
//     const { theme, setTheme } = useTheme();
//     const [mounted, setMounted] = useState(false);

//     useEffect(() => {
//         setMounted(true);
//         const lastCity = localStorage.getItem('lastCity') || 'Hyderabad';
//         handleCitySearch(lastCity);
//     }, []);

//     console.log(forecastData);
    

//     const handleCitySearch = async (city: string) => {
//         if (!city) return;
//         setIsLoading(true);
//         setError(null);

//         try {
//             const res = await fetchWeather(city);
//             const { lat, lon } = res.coord;
//             const res1 = await fetchForecast(lat, lon);

//             setWeatherData(res);
//             setForecastData(res1);

//             // Format for chart
//             const formatted = forecastData.list.slice(0, 7).map((day: any) => {
//                 const date = new Date(day.dt * 1000);
//                 return {
//                     name: date.toLocaleDateString('en-US', { weekday: 'short' }),
//                     temperature: Math.round(day.temp.day),
//                     humidity: day.humidity
//                 };
//             });
//             setFormattedForecast(formatted);

//             localStorage.setItem('lastCity', city);
//         } catch (err) {
//             console.error('Error fetching data:', err);
//             setError('Invalid city name. Showing last known data.');
//         }

//         setIsLoading(false);
//     };

//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         handleCitySearch(searchInput.trim());
//     };

//     if (!mounted) return null;

//     return (
//         <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white p-4 font-sans transition-colors duration-300">
//             <div className="max-w-5xl mx-auto">
//                 {/* Search Input */}
//                 <form onSubmit={handleSubmit} className="flex mb-6 gap-2">
//                     <input
//                         type="text"
//                         value={searchInput}
//                         onChange={(e) => setSearchInput(e.target.value)}
//                         placeholder="Search for cities"
//                         className="flex-grow p-3 border border-gray-300 dark:border-gray-700 rounded shadow-sm bg-white dark:bg-gray-800 text-black dark:text-white"
//                     />
//                     <button
//                         type="submit"
//                         className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
//                     >
//                         Search
//                     </button>
//                 </form>

//                 {/* Loading */}
//                 {isLoading && <p className="text-center text-gray-500 dark:text-gray-400">Loading weather data...</p>}

//                 {/* Error */}
//                 {error && <p className="text-center text-red-500">{error}</p>}

//                 {/* Weather Display */}
//                 {!isLoading && weatherData && (
//                     <>
//                         <div className="flex items-center justify-between mb-6">
//                             <div>
//                                 <h1 className="text-3xl font-bold">{weatherData.name}</h1>
//                                 <p>Chance of rain: {weatherData.rain ? weatherData.rain['1h'] || 0 : 0}%</p>
//                                 <p className="text-2xl">{Math.round(weatherData.main.temp)}°</p>
//                             </div>
//                         </div>

//                         {/* Air Conditions */}
//                         <div className="bg-gray-100 dark:bg-gray-800 rounded p-4 mb-6">
//                             <h2 className="font-semibold mb-2">AIR CONDITION</h2>
//                             <div className="grid grid-cols-2 gap-4">
//                                 <p>🌡 Real Feel: {Math.round(weatherData.main.feels_like)}°</p>
//                                 <p>💨 Wind: {weatherData.wind.speed} KM/H</p>
//                                 <p>🌧 Chance of Rain: 0%</p>
//                                 <p>☀️ UV Index: 3</p>
//                             </div>
//                             <button className="bg-blue-500 text-white px-4 py-1 rounded mt-2 hover:bg-blue-600">See More</button>
//                         </div>

//                         {/* Forecast Chart */}
//                         <div className="bg-gray-100 dark:bg-gray-800 rounded p-4">
//                             <h2 className="font-semibold mb-4">7-Day Forecast</h2>
//                             <ResponsiveContainer width="100%" height={300}>
//                                 <ComposedChart data={formattedForecast}>
//                                     <CartesianGrid strokeDasharray="3 3" />
//                                     <XAxis dataKey="name" />
//                                     <YAxis />
//                                     <Tooltip />
//                                     <Legend />
//                                     <Bar dataKey="humidity" fill="#8884d8" name="Humidity (%)" />
//                                     <Line type="monotone" dataKey="temperature" stroke="#ff7300" name="Temperature (°C)" />
//                                 </ComposedChart>
//                             </ResponsiveContainer>
//                         </div>
//                     </>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default WeatherPage;


// 'use client';

// import React, { useEffect, useState } from 'react';
// import { fetchWeather, fetchForecast } from '@/services/weatherService';
// import { useTheme } from 'next-themes';
// import {
//     ResponsiveContainer,
//     ComposedChart,
//     XAxis,
//     YAxis,
//     Tooltip,
//     Legend,
//     Bar,
//     Line,
//     CartesianGrid
// } from 'recharts';

// const WeatherPage = () => {
//     const [weatherData, setWeatherData] = useState<any>(null);
//     const [forecastData, setForecastData] = useState<any>(null);
//     const [formattedForecast, setFormattedForecast] = useState<any[]>([]);
//     const [error, setError] = useState<string | null>(null);
//     const [isLoading, setIsLoading] = useState<boolean>(true);
//     const [searchInput, setSearchInput] = useState('');
//     const { theme, setTheme } = useTheme();
//     const [mounted, setMounted] = useState(false);

//     useEffect(() => {
//         setMounted(true);
//         const lastCity = localStorage.getItem('lastCity') || 'Hyderabad';
//         handleCitySearch(lastCity);
//     }, []);

//     useEffect(() => {
//         if (forecastData?.list) {
//             // Format for chart
//             const formatted = forecastData.list.slice(0, 7).map((day: any) => {
//                 const date = new Date(day.dt * 1000);
//                 return {
//                     name: date.toLocaleDateString('en-US', { weekday: 'short' }),
//                     temperature: Math.round(day.temp.day - 273.15), // Convert Kelvin to Celsius
//                     humidity: day.humidity
//                 };
//             });
//             setFormattedForecast(formatted);
//         }
//     }, [forecastData]);

//     const handleCitySearch = async (city: string) => {
//         if (!city) return;
//         setIsLoading(true);
//         setError(null);

//         try {
//             const res = await fetchWeather(city);
//             const { lat, lon } = res.coord;
//             const res1 = await fetchForecast(lat, lon);

//             setWeatherData(res);
//             setForecastData(res1);
//             localStorage.setItem('lastCity', city);
//         } catch (err) {
//             console.error('Error fetching data:', err);
//             setError('Invalid city name. Showing last known data.');
//         }

//         setIsLoading(false);
//     };

//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         handleCitySearch(searchInput.trim());
//     };

//     if (!mounted) return null;

//     return (
//         <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white p-4 font-sans transition-colors duration-300">
//             <div className="max-w-5xl mx-auto">
//                 {/* Search Input */}
//                 <form onSubmit={handleSubmit} className="flex mb-6 gap-2">
//                     <input
//                         type="text"
//                         value={searchInput}
//                         onChange={(e) => setSearchInput(e.target.value)}
//                         placeholder="Search for cities"
//                         className="flex-grow p-3 border border-gray-300 dark:border-gray-700 rounded shadow-sm bg-white dark:bg-gray-800 text-black dark:text-white"
//                     />
//                     <button
//                         type="submit"
//                         className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
//                     >
//                         Search
//                     </button>
//                 </form>

//                 {/* Loading */}
//                 {isLoading && <p className="text-center text-gray-500 dark:text-gray-400">Loading weather data...</p>}

//                 {/* Error */}
//                 {error && <p className="text-center text-red-500">{error}</p>}

//                 {/* Weather Display */}
//                 {!isLoading && weatherData && (
//                     <>
//                         <div className="flex items-center justify-between mb-6">
//                             <div>
//                                 <h1 className="text-3xl font-bold">{weatherData.name}</h1>
//                                 <p>Chance of rain: {weatherData.rain ? weatherData.rain['1h'] || 0 : 0}%</p>
//                                 <p className="text-2xl">{Math.round(weatherData.main.temp)}°</p>
//                             </div>
//                         </div>

//                         {/* Air Conditions */}
//                         <div className="bg-gray-100 dark:bg-gray-800 rounded p-4 mb-6">
//                             <h2 className="font-semibold mb-2">AIR CONDITION</h2>
//                             <div className="grid grid-cols-2 gap-4">
//                                 <p>🌡 Real Feel: {Math.round(weatherData.main.feels_like)}°</p>
//                                 <p>💨 Wind: {weatherData.wind.speed} KM/H</p>
//                                 <p>🌧 Chance of Rain: 0%</p>
//                                 <p>☀️ UV Index: 3</p>
//                             </div>
//                             <button className="bg-blue-500 text-white px-4 py-1 rounded mt-2 hover:bg-blue-600">See More</button>
//                         </div>

//                         {/* Forecast Chart */}
//                         <div className="bg-gray-100 dark:bg-gray-800 rounded p-4">
//                             <h2 className="font-semibold mb-4">7-Day Forecast</h2>
//                             <ResponsiveContainer width="100%" height={300}>
//                                 <ComposedChart data={formattedForecast}>
//                                     <CartesianGrid strokeDasharray="3 3" />
//                                     <XAxis dataKey="name" />
//                                     <YAxis />
//                                     <Tooltip />
//                                     <Legend />
//                                     <Bar dataKey="humidity" fill="#8884d8" name="Humidity (%)" />
//                                     <Line type="monotone" dataKey="temperature" stroke="#ff7300" name="Temperature (°C)" />
//                                 </ComposedChart>
//                             </ResponsiveContainer>
//                         </div>
//                     </>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default WeatherPage;

'use client';

import React, { useEffect, useState } from 'react';
import { fetchWeather, fetchForecast } from '@/services/weatherService';
import { useTheme } from 'next-themes';
import {
    ResponsiveContainer,
    ComposedChart,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    Bar,
    Line,
    CartesianGrid
} from 'recharts';

const WeatherPage = () => {
    const [weatherData, setWeatherData] = useState<any>(null);
    const [forecastData, setForecastData] = useState<any>(null);
    const [formattedForecast, setFormattedForecast] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [searchInput, setSearchInput] = useState('');
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const lastCity = localStorage.getItem('lastCity') || 'Hyderabad';
        handleCitySearch(lastCity);
    }, []);

    useEffect(() => {
        if (forecastData?.list) {
            // Format for chart
            const formatted = forecastData.list.slice(0, 7).map((day: any) => {
                const date = new Date(day.dt * 1000);
                return {
                    name: date.toLocaleDateString('en-US', { weekday: 'short' }),
                    temperature: Math.round(day.temp.day - 273.15), // Convert Kelvin to Celsius
                };
            });
            setFormattedForecast(formatted);
        }
    }, [forecastData]);

    console.log(weatherData);
    

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleCitySearch(searchInput.trim());
    };

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white p-4 font-sans transition-colors duration-300">
            <div className="max-w-5xl mx-auto">
                {/* Search Input */}
                <form onSubmit={handleSubmit} className="flex mb-6 gap-2">
                    <input
                        type="text"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        placeholder="Search for cities"
                        className="flex-grow p-3 border border-gray-300 dark:border-gray-700 rounded shadow-sm bg-white dark:bg-gray-800 text-black dark:text-white"
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        Search
                    </button>
                </form>

                {/* Loading */}
                {isLoading && <p className="text-center text-gray-500 dark:text-gray-400">Loading weather data...</p>}

                {/* Error */}
                {error && <p className="text-center text-red-500">{error}</p>}

                {/* Weather Display */}
                {!isLoading && weatherData && (
                    <>
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h1 className="text-3xl font-bold">{weatherData.name}</h1>
                                <p> {weatherData.weather ? weatherData.weather[0].description || 0 : 0}</p>
                                <p className="text-2xl">{Math.round(weatherData.main.temp)}°</p>
                            </div>
                        </div>

                        {/* Air Conditions */}
                        <div className="bg-gray-100 dark:bg-gray-800 rounded p-4 mb-6">
                            <h2 className="font-semibold mb-2">AIR CONDITION</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <p>🌡 Real Feel: {Math.round(weatherData.main.feels_like)}°</p>
                                <p>💨 Wind: {weatherData.wind.speed} KM/H</p>
                                <p>🌧 Chance of Rain: 0%</p>
                                <p>☀️ UV Index: 3</p>
                            </div>
                        
                        </div>

                        {/* Forecast Chart */}
                        <div className="bg-gray-100 dark:bg-gray-800 rounded p-4">
                            <h2 className="font-semibold mb-4">7-Day Temperature Forecast (°C)</h2>
                            <ResponsiveContainer width="100%" height={300}>
                                <ComposedChart data={formattedForecast}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis 
                                        domain={[20, 40]} 
                                        label={{ value: 'Temperature (°C)', angle: -90, position: 'insideLeft' }}
                                    />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="temperature" fill="#ff7300" name="Temperature (°C)" opacity={0.3} />
                                    <Line type="monotone" dataKey="temperature" stroke="#ff7300" name="Temperature (°C)" strokeWidth={2} />
                                </ComposedChart>
                            </ResponsiveContainer>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default WeatherPage;