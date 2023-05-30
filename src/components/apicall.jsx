import "./cardUI.css";
import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const ApiCall = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const hitApi = () => {
    const apiKey = "95cc29ac246be73316eeafd2eb93e502";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;


    setIsLoading(true);

    fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("API call failed!");
      }
      return response.json();
    })
    .then((data) => {
      setWeatherData(data);
      setIsLoading(false);
      toast.success('API call successful!');
      console.log(data);
    })
    .catch((error) => {
      setIsLoading(false);
      toast.error(error.message);
      console.log("Error fetching weather data:", error);
    })

   
// if(isLoading) { 
//   return <div>Loading</div>
// }


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
          <button onClick={hitApi}>{isLoading ? <>Loading..</> : <> Search </>}</button>

          {weatherData && (
            <div className="container">

              <div className="city">
              
              <h2>City </h2><h2 >{weatherData.name}</h2> 
              </div>
              <div className="container-ui">
              <p>
                Temperature:   </p> <p className="temp">{KelvinToCelsius(weatherData.main.temp)}&#176;C</p> 
           
              </div>
              <div className="container-ui">
              <p>Humidity: </p> <p >{weatherData.main.humidity}%  </p>
              </div>

              <div className="container-ui cloud">
              <p>Cloud: </p><p > {weatherData.clouds.all}% </p>  
              </div>
              <div className="container-ui wind">
              <p>Wind:</p> <p className="wind">{weatherData.wind.speed} m/s</p> 
            </div>
            </div>
          )}
        </div>
      </div>

      <ToastContainer  autoClose={1000} />
    </>
  );
};
