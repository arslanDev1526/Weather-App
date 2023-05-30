import "./cardUI.css";
import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const ApiCall = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const hitApi = () => {
    const apiKey = "95cc29ac246be73316eeafd2eb93e502";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("API call failed!");
      }
      return response.json();
    })
    .then((data) => {
      setWeatherData(data);
      toast.success('API call successful!');
      console.log(data);
    })
    .catch((error) => {
      toast.error(error.message);
      console.log("Error fetching weather data:", error);
    });

    setCity("")

};
  const KelvinToCelsius = (kelvin) => {
    let conversion = kelvin - 273.15;
    let wholeNum = parseInt(conversion);
    return wholeNum;
  };

  return (
    <>

    <div className="cloud"></div>
      <div className="card">
        <h1>Weather App</h1>
        <div className="card-content">
          <input
            onChange={(e) => {
              setCity(e.target.value);
            }}
            type="text"
            value={city}
            placeholder="City"
          />
          <br />
          <button onClick={hitApi}>Search</button>

          {weatherData && (
            <div className="container">
              <h2>City <span className="city">{weatherData.name}</span> </h2>
              <p>
                Temperature: <span className="temp">{KelvinToCelsius(weatherData.main.temp)}&#176;C</span> 
              </p>
              <p>Humidity:  <span className="humi">{weatherData.main.humidity}% </span> </p>
              <p>Cloud: <span className="clou"> {weatherData.clouds.all} % </span>  </p>
              <p>Wind: <span className="wind">{weatherData.wind.speed} m/s</span> </p>
            </div>
          )}
        </div>
      </div>

      <ToastContainer  autoClose={1000} />
    </>
  );
};
