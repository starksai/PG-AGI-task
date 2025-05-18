interface WeatherInfoProps {
  weatherData: {
    name: string;
    main: { temp: number };
    weather: { description: string }[];
    rain?: { '1h': number };
  };
}

export default function WeatherInfo({ weatherData }: WeatherInfoProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-3xl font-bold">{weatherData.name}</h1>
        <p>
          {weatherData.weather ? weatherData.weather[0].description : 'N/A'}
        </p>
        <p className="text-2xl">{Math.round(weatherData.main.temp)}°</p>
      </div>
    </div>
  );
}