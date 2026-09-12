import { useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("Mumbai");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const getWeather = async () => {
    if (city.trim() === "") {
      setError("Please enter a city");
      setWeather(null);
      return;
    }

    try {
      setError("");
      setWeather(null);
      
      const API_KEY = import.meta.env.VITE_API_KEY;

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      const data = await response.json();

      console.log(data);

      if(response.ok){
        setWeather(data);
      } 
      else {
        setError(data.message || "City not found");
      }
    } 
    catch(error){
      console.log(error);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="app">

      <div className="weather-box">
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <button onClick={getWeather}>
          Get Weather
        </button>

        {error && (
          <p className="error">
            {error}
          </p>
        )}

        {weather && (
          <div className="weather-info">
            <h1>{weather.name}</h1>
            <p className="temperature">
              {weather.main.temp} °C
            </p>
            <p className="description">
              {weather.weather[0].description}
            </p>

          </div>
        )}
      </div>
    </div>
  );
}

export default App;