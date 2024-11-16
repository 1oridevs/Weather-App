import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import About from './About';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const cities = [
    'New York', 'London', 'Tokyo', 'Paris', 'Tel Aviv', 
    'Sydney', 'Berlin', 'Moscow', 'Toronto', 'Mumbai'
  ];

  const fetchWeather = async () => {
    if (city === '') return;
    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=e7878778d1294125850141942241611&q=${city}&aqi=no`
      );
      setWeather(response.data);
      setError('');
    } catch (err) {
      setError('City not found');
      setWeather(null);
    }
  };

  return (
    <Router>
      <div className="app">
        <nav>
          <Link to="/">Weather</Link>
          <Link to="/about">About</Link>
        </nav>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <h1>Weather App</h1>
                <div className="input-container">
                  <select value={city} onChange={(e) => setCity(e.target.value)}>
                    <option value="">Select a city</option>
                    {cities.map((city) => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                  <button onClick={fetchWeather}>Get Weather</button>
                </div>
                {error && <p className="error">{error}</p>}
                {weather && weather.location && weather.current && (
                  <div className="weather-info">
                    <h2>{weather.location.name}, {weather.location.country}</h2>
                    <p>🌡️ {weather.current.temp_c}°C</p>
                    <p>💧 {weather.current.humidity}% Humidity</p>
                    <p>💨 {weather.current.wind_kph} km/h Wind Speed</p>
                    <img src={weather.current.condition.icon} alt="weather icon" />
                  </div>
                )}
              </div>
            }
          />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
