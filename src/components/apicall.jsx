import "./cardUI.css";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const locationKey = import.meta.env.VITE_LOCATION_KEY
const apiKey = import.meta.env.VITE_LOCATION_AP_KEY
const accessKey = import.meta.env.VITE_ACCESS_KEY

export const ApiCall = ({ photoData, setPhotoData }) => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [locationData, setLocationData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  
  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {
    const locationUrl = `https://apiip.net/api/check?accessKey=${locationKey}`;

    try {
      const locationResponse = await fetch(locationUrl);
      const locationData = await locationResponse.json();

      if (!locationData.success) {
        toast.error(locationData?.message?.type ?? "Invalid input");
        setError(true)
        return;
      }

      setLocationData(locationData.city);
      setCity(locationData.city);
      hitApi(locationData.city)
    } catch (error) {
      setError(true)
      toast.error(error?.message ?? "Invalid input");

      console.log("Error fetching location data:", error);
    }
  };
 

  const hitApi = async (city) => {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const photoUrl = `https://api.unsplash.com/search/photos?query=${city}&client_id=${accessKey}`;
    setIsLoading(true);

    try {
      const responses = await Promise.all([fetch(weatherUrl), fetch(photoUrl)]);
      const weatherData = await responses[0].json();
      const photoData = await responses[1].json();

      console.log(weatherData, "weatherData");
      console.log(photoData, "photoData");
      if (weatherData.cod !== 200) {
        setError(true)
        setWeatherData(null);
        toast.error(weatherData?.message ?? "Invalid input");
        return;
      }

      setWeatherData(weatherData);
      setPhotoData(photoData);
      setError(false)
    } catch (error) {
      setError(true)
      console.log("Error fetching weather data:", error);
    }
    setIsLoading(false);
  };

  const KelvinToCelsius = (kelvin) => {
    let conversion = kelvin - 273.15;
    let wholeNum = parseInt(conversion);
    return wholeNum;
  };

  const handleKeyPress = (event) => {
    if (event.key !== "Enter") return;
    hitApi(city);
  };

  const handleClick = (event) => {
    hitApi(city);
  };


  return (
    <>
      <div className="card">
        <div className="search">
          <input
            onChange={(e) => {
              setCity(e.target.value);
            }}
            type="text"
            value={city}
            onKeyDown={handleKeyPress}
            className="searchbar"
            placeholder="search"
          />
          <button onClick={handleClick}>
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 1024 1024"
              height="1.5em"
              width="1.5em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0 0 11.6 0l43.6-43.5a8.2 8.2 0 0 0 0-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"></path>
            </svg>
          </button>
        </div>

        {weatherData && (
          <div className="weather">
            <h2 className="city"> Weather in {weatherData.name} </h2>
            <h2 className="temp">
              {KelvinToCelsius(weatherData.main.temp)}&#176;C
            </h2>
            <div className="flex">
              <img src="" alt="clods" />
              <div className="description"> scattered clouds</div>
            </div>
            <div className="humidity">
              Humidity:{weatherData.main.humidity}%
            </div>
            <div className="wind">
              {" "}
              Wind speed:{weatherData.wind.speed} m/s{" "}
            </div>
          </div>
        )}
      </div>
    </>
  );
};
