 import "../sai.css";
import React, { useState } from 'react';

const apiKey = "92f8aaa04b1879d44dd100312b04796b"
export default function WeatherApp() {
    const [weather, setWeather] = useState({});
    

    function handleSubmit(event) {
        event.preventDefault();

        let city = event.target.city.value.trim();

        if (!city) {
            alert("Please provide the city name");
            return;
        }
 fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + apiKey)
            .then(response => {
                if (!response.ok) {
                    throw new Error("City not found");
                }
                return response.json();
            })
            .then(data => {
                setWeather({
                    icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
                    temp: data.main.temp,
                    city: data.name,
                    humidity: data.main.humidity,
                    speed: data.wind.speed
                });
            })
            .catch(error => {
                console.error(error);
                alert("Unable to fetch the weather forecast");
            });
    }

    return (
        <div className="weather-container">
            <h2>Weather Forecast App</h2>

            <form onSubmit={handleSubmit} className="search-box">
                <input type="text" name="city" placeholder="City" />
                <button type="submit">Search</button>
            </form>

            {weather.city && (
                <div className="weather-info">
                    <img src={weather.icon} alt="Weather Icon" />
                    <h1>{weather.temp} °C</h1>
                    <h3>{weather.city}</h3>

                    <div className="details">
                        <div className="humi">
                            <span>🌊 Humidity</span>
                            <p>{weather.humidity} %</p>
                        </div>
                        <div className="speed">
                            <span>💨 Wind Speed</span>
                            <p>{weather.speed} km/h</p>
                        </div>
                    </div>
                </div>
            )}

            <p className="footer">Developed by <b style={{ color: 'yellow' }}>Saikumar</b></p>
        </div>
    );
}


