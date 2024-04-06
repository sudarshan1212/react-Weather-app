import { useState, useEffect } from "react";

import "./App.css";
// Images
import searchIcon from "./assets/search.png";
import clearIcon from "./assets/clear.png";
import cloudIcon from "./assets/clouds.png";
import drizzleIcon from "./assets/drizzle.png";
import rainIcon from "./assets/rain.png";
import windIcon from "./assets/wind.png";
import snowIcon from "./assets/snow.png";
import humidityIcon from "./assets/humidity.png";
// const weather = async () => {
//   const api_key = "26523a9edbcdae483b22161d0b2255fb";
//   const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${}&appid=${api_key}`;
// };

const WeatherDetails = ({
  icon,
  temp,
  city,
  country,
  lat,
  log,
  wind,
  humi,
}) => {
  return (
    <>
      <div className="image">
        <img src={icon} alt="Image" width="200" height="200" />
      </div>
      <div className="temp">{temp}°C </div>
      <div className="location">{city}</div>
      <div className="country">{country}</div>
      <div className="cord">
        <div>
          <span className="lat">latitude</span>
          <span>{lat}</span>
        </div>
        <div>
          <span className="log">Longitude</span>
          <span>{log}</span>
        </div>
      </div>
      <div className="data-container">
        <div className="element">
          <img src={humidityIcon} alt="humidity" className="icon" />
          <div className="data">
            <div className="humidity-percent">{humi}%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element-1">
          <img src={windIcon} alt="wind" className="icon" />
          <div className="data">
            <div className="humidity-percent">{wind} km/h</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </>
  );
};
function App() {
  const api_key = "26523a9edbcdae483b22161d0b2255fb";
  //UseState
  const [text, settext] = useState("london");
  const [icon, seticon] = useState(cloudIcon);
  //innerText
  const [temp, settemp] = useState(0);
  const [city, setcity] = useState("London");
  const [country, setcountry] = useState("");
  const [lat, setlat] = useState(0);
  const [long, setlong] = useState(0);
  const [wind, setwind] = useState(0);
  const [humi, sethumi] = useState(0);
  //cOntrolers
  const [CityNotFound, setCityNotFound] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [Error] = useState(null);
  //WEATEHER ICON
  const weatherIconMap = {
    "01d": clearIcon,
    "01n": clearIcon,
    "02d": cloudIcon,
    "02n": cloudIcon,
    "03d": drizzleIcon,
    "03n": drizzleIcon,
    "04d": drizzleIcon,
    "04n": drizzleIcon,
    "09d": rainIcon,
    "09n": rainIcon,
    "10d": rainIcon,
    "10n": rainIcon,
    "13d": snowIcon,
    "13n": snowIcon,
  };
  const weather = async () => {
    setLoading(true);
    const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${text}&appid=${api_key}`;
    try {
      let res = await fetch(url);
      let data = await res.json();
      console.log(data);
      if (data.cod == "404") {
        console.log("error");
        setCityNotFound(true);
        setLoading(false);
        return;
      }
      sethumi(data.main.humidity);
      setwind(data.wind.speed);
      settemp(Math.floor(data.main.temp));
      setcity(data.name);
      setcountry(data.sys.country);
      setlong(data.coord.lat);
      setlat(data.coord.lon);
      const weatherIconCode = data.weather[0].icon;
      seticon(weatherIconCode[weatherIconMap] || clearIcon);

      setCityNotFound(false);
    } catch (error) {
      console.log("An error Occured in :", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCity = (e) => {
    settext(e.target.value);
  };
  const handleKeyDown = (e) => {
    if (e.key == "Enter") {
      weather();
    }
  };
  useEffect(function () {
    weather();
  }, []);
  // console.log(text);
  return (
    <>
      <div className="container">
        <div className="input-container">
          <input
            type="text"
            className="cityInput"
            name=""
            placeholder="Search City"
            onChange={handleCity}
            value={text}
            onKeyDown={handleKeyDown}
            onClick={() => {
              weather();
            }}
          />
          <div className="search-icon">
            <img
              src={searchIcon}
              alt="Search"
              width="20"
              height="20"
              onClick={() => {
                weather();
              }}
            />
          </div>
        </div>
        {!Loading && !CityNotFound && (
          <WeatherDetails
            icon={icon}
            temp={temp}
            city={city}
            country={country}
            lat={lat}
            log={long}
            humi={humi}
            wind={wind}
          />
        )}
        {Loading && <div className="loading">Loading...</div>}
        {Error && <div className="error">{Error}</div>}
        {CityNotFound && <div className="city-not-found">City not Found</div>}
      </div>
    </>
  );
}

export default App;
