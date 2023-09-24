import axios from 'axios';
import React, { useState } from 'react';
import { FaCloud, FaSun, FaSnowflake, FaCloudRain, FaExclamationTriangle } from 'react-icons/fa';
import notFoundImage from '../weather.jpg'

const Home = () => {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false); 
  const apikey = '6cb8ca6da5841b7f229cd64ed9856490'; 
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${apikey}`;
  const convertToCelsius = (fahrenheit) => (fahrenheit - 32) * 5/9;
  const weatherIcons = {
    'Clouds': <FaCloud />,
    'Clear': <FaSun />,
    'Snow': <FaSnowflake />,
    'Rain': <FaCloudRain />,
    'Thunderstorm': <FaCloudRain />,
    'Mist': <FaCloud />,
  };

  const searchLocation = () => {
    if (location) {
      axios
        .get(url)
        .then((response) => {
          setData(response.data);
          setError('');
          setSearched(true); 
        })
        .catch((error) => {
          console.error('Error:', error);
         
          setSearched(true); 
          

        });
        setLocation('');
    }
  };

  return (
    <div className="bg-gradient-to-b from-blue-500 via-blue-300 to-blue-200 text-white min-h-screen flex flex-col justify-center items-center">
    <h1 className="text-4xl font-bold mb-4">Weather Click</h1>
    <div className="bg-opacity-80 backdrop-blur-lg rounded-lg p-4 text-center">
      <div className="mb-4">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={(event) => {
            if (event.key === 'Enter') {
              setLocation(event.target.value);
            }
          }}
          placeholder="Enter Location"
          className="px-4 py-2 rounded-full bg-gray-100 text-gray-800 focus:outline-none focus:ring focus:border-blue-300"
          type="text"
        />
      </div>
      <button
        onClick={searchLocation}
        className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
      >
        Search
      </button>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {data.name && (
            <div className="bg-blue-gray-300 bg-opacity-90 p-4 rounded-lg shadow-lg mt-4">
          <h2 className="text-2xl font-semibold mb-2">{data.name}</h2>
          <div className="flex items-center space-x-2 mb-2">
            {weatherIcons[data.weather[0].main] || <FaExclamationTriangle className="text-gray-500" />}
            <span className="text-xl">{data.weather[0].main}</span>
          </div>
          <div className="text-4xl font-bold">
            {Math.round(data.main.temp)}°F / {Math.round(convertToCelsius(data.main.temp))}°C
          </div>
          <div className="text-black">
            Feels Like: {Math.round(data.main.feels_like)}°F / {Math.round(convertToCelsius(data.main.feels_like))}°C
          </div>
          <div className="text-black">
            Humidity: {data.main.humidity}%
          </div>
          <div className="text-black">
            Wind Speed: {Math.round(data.wind.speed)} MPH
          </div>
        </div>
      )}
    </div>
    
    
   
  </div>
);
};


export default Home;
