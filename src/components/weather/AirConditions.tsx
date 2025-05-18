interface AirConditionsProps {
  weatherData: {
    main: { feels_like: number };
    wind: { speed: number };
    rain?: { '1h': number };
  };
}

export default function AirConditions({ weatherData }: AirConditionsProps) {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 rounded p-4 mb-6">
      <h2 className="font-semibold mb-2">AIR CONDITION</h2>
      <div className="grid grid-cols-2 gap-4">
        <p>🌡 Real Feel: {Math.round(weatherData.main.feels_like)}°</p>
        <p>💨 Wind: {weatherData.wind.speed} KM/H</p>
        <p>🌧 Chance of Rain: {weatherData.rain ? weatherData.rain['1h'] || 0 : 0}%</p>
        <p>☀️ UV Index: N/A</p>
      </div>
    </div>
  );
}