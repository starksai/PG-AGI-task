const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
const forecastApiKey = process.env.NEXT_PUBLIC_FORECAST_API_KEY;


export async function fetchWeather(city: string) {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    return res.json();
}

export async function fetchForecast(lat: number, lon: number) {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&appid=${forecastApiKey}`);
    return res.json();
}




