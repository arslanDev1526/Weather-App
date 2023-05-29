import React, { useState } from "react";

export const ApiCall = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const hitApi = () => {
    const apiKey = "95cc29ac246be73316eeafd2eb93e502";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setWeatherData(data);


        console.log(data)
      })
      .catch((error) => {
        console.log("Error fetching weather data:", error);
      });
  };

 

  const citySelection = () => {
    // Implement your logic for city selection here
    console.log("City selection button clicked");
  };
  const KelvinToCelsius = (kelvin) => { 
    let conversion =  kelvin - 273.15;
    let wholeNum = parseInt(conversion)
    return wholeNum
  }
  

  return (
    <>
      <label>City:</label>
      <br />
      <input
        onChange={(e) => {
          setCity(e.target.value);
        }}
        type="text"
        value={city}
        placeholder="Write..."
      />
      <br />
      <button onClick={hitApi}>Search</button>
      <button onClick={citySelection}>Select City</button>

      {weatherData && (
        <div>
          <h2>Weather Information for {weatherData.name}</h2>
          <p>Temperature: {KelvinToCelsius(weatherData.main.temp)}</p>
          <p>Humidity: {weatherData.main.humidity}</p>
          <p>Cloud: {weatherData.clouds.all} % </p>
          <p>Wind: {weatherData.wind.speed} m/s</p>
          {/* Render other weather data properties as needed */}
        </div>
      )}
    </>
  );
};
