import React, { useState } from 'react';
import axios from 'axios';

function WeatherApp() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  
  const getWeather = async () => {
    if (city.trim() === "") return;
    try {
      let response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    
      setWeather(response.data)
      setError(null)
    } catch (error) {
      setError("city not found")
      setWeather(null);
    }
  }

  return (
    <>
      <div className='w-full h-screen flex flex-col gap-12 items-center justify-center'>
        <h1 className='text-4xl'>Weather App</h1>
        <div>
          <input type="text" value={city } className='rounded-l-full  border border-red-500 border-r-0 pl-5 focus:border-red-500 focus:outline-none h-10' placeholder='enter city' onChange={()=>setCity(e.target.value)} />
          <button className='px-4 py-2 text-white rounded-r-full bg-blue-500' onClick={getWeather}>Get Weather</button>
        </div>
        {error && <p className='text-red-500'>{error}</p>}
        {weather && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold">{weather.name}, {weather.sys.country}</h2>
          <p className="text-lg">{weather.weather[0].description}</p>
          <p className="text-4xl font-bold">{weather.main.temp}°C</p>
          <div className="flex gap-4">
            <p>Humidity: {weather.main.humidity}%</p>
            <p>Wind Speed: {weather.wind.speed} m/s</p>
          </div>
        </div>
      )}
      </div>
    </>
  )
}

export default WeatherApp;
