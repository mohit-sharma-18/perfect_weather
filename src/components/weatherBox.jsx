const weatherBox = (props) => {
    console.log(props);
    
  const { country, city, weather, temperature, feels_like } = props.props;
  return (
    <div className="weather-card">
      <h2>Country: {country}</h2>
      <h3>City: {city}</h3>
      <p>Weather: {weather}</p>
      <p>Temperature: {temperature}°C</p>
      <p>Feels like: {feels_like}°C</p>
    </div>
  );
};

export default weatherBox;
