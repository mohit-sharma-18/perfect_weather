import "./css/weatherBox.css";
import Container from "./components/container";
import WeatherBox from "./components/weatherBox";
import { useEffect, useState } from "react";

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [weatherMsg, setWeatherMsg] = useState("");
  const [weatherContainerflag, setWeatherContainerFlag] = useState(false);
  const [btnFlag, setBtnFlag] = useState(true);

  const weatherApiHandler = async () => {
    const fetchApi = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=9ed77cf4d4844e02be583806241812&q=${city}&aqi=no`
    );
    const res = await fetchApi.json();
    // if (res.length > 0) {
    setWeatherData({
      country: res?.location?.country && "",
      city: res?.location?.name && "",
      weather: res?.current?.condition?.text && "",
      temperature: res?.current?.temp_c && "",
      feels_like: res?.current?.feelslike_c && "",
    });
    setWeatherContainerFlag(true);
    if (res?.current?.temp_c && "" >= 20 && res?.current?.temp_c && "" <= 30) {
      setWeatherMsg("Perfect weather for a family vacation!");
    } else if (res?.current?.temp_c && "" > 30) {
      setWeatherMsg("It's hot, stay cool!");
    } else if (res?.current?.temp_c && "" < 0) {
      setWeatherMsg("It's freezing, pack warm clothes!");
    } else {
      setWeatherMsg("Weather is okay for traveling!");
    }
  };

  const handleChange = (e) => {
    e.target.value.length > 0 ? setBtnFlag(false) : setBtnFlag(true)
    setCity(e.target.value);
  };

  const handleClick = () => {
    weatherApiHandler();
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Perfect Weather</h1>
        <p>Ready to step outside? Let’s check the weather!</p>
      </header>
      <div className="container">
        <input
          type="text"
          placeholder="Enter any city to check weather"
          value={city}
          onChange={handleChange}
        ></input>
        <button
          onClick={handleClick}
          className={`${btnFlag ? "disabled" : ""}`}
        >
          Check Weather
        </button>
      </div>
      {weatherContainerflag && <WeatherBox props={weatherData} />}
      <p style={{ fontSize: "20px" }}>{weatherMsg}</p>
    </div>
  );
}

export default App;
