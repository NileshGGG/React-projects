import { useEffect, useRef, useState } from "react";
import React from "react";
import search from "../assets/search.png"
import rain from "../assets/rain.png"
import snow from "../assets/snow.png"
import wind from "../assets/wind.png"
import humidity from "../assets/humidity.png"
import drizzle from "../assets/drizzle.png"
import cloud from "../assets/cloud.png"
import clear from "../assets/clear.png"
import "./Weather.css";

const Weather = () => {

    const inpRef = useRef();
    const [weatherData, setWeatherData] = useState(false);
    const allIcons = {
        "01d": clear,
        "01n": clear,
        "02d": cloud,
        "02n": cloud,
        "03d": cloud,
        "03n": cloud,
        "04d": drizzle,
        "04n": drizzle,
        "09d": rain,
        "09n": rain,
        "10d": rain,
        "10n": rain,
        "13d": snow,
        "13n": snow,
    };

    const capitalize = (str) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

    const searchWeather = async (city) => {
        if (city === "") {
            alert("Enter City name");
            return;
        }
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`

            const response = await fetch(url);
            const data = await response.json();

            if(!response.ok){
                alert(data.message);
                return;
            }
            console.log(data);
            const icons = allIcons[data.weather[0].icon] || clear;
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icons
            });
        } catch (e) {
            setWeatherData(false);
            console.error("Error in fetching weather Data");
        }
    }
    useEffect(() => {
        searchWeather(capitalize("Mumbai"));
    }, [])
    return (
        <div className="weather">
            <div className="search-bar">
                <input ref={inpRef} type="text" placeholder="Mumbai" />
                <img src={search} alt="" onClick={() => searchWeather(inpRef.current.value)} />
            </div>

            {weatherData ? 
            <>
                <img src={weatherData.icon} alt="weather icon" className="weather-icon" />
                <p className="temperature">{weatherData.temperature}&deg;c</p>
                <p className="location">{weatherData.location}</p>

                <div className="weather-data">
                    <div className="col">
                        <img src={humidity} />
                        <div>
                            <p>86%</p>
                            <span>{weatherData.humidity}</span>
                        </div>
                    </div>
                    <div className="col">
                        <img src={wind} />
                        <div>
                            <p>{weatherData.windSpeed} Km/h</p>
                            <span>Wind Speed</span>
                        </div>
                    </div>
                </div>
            </>
                :
            <></>}
        </div>

    )
}

export default Weather;