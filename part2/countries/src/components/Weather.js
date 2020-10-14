import React from 'react'

const Weather = ({ capital, weather }) => (
    <div>
        <h3>Weather in {capital}</h3>
        <p>
            <strong>temperature:</strong> {weather.temperature} &#730;Celcius
        </p>
        <img
            src={weather.weather_icons}
            alt={weather.weather_descriptions}
            height="80"
        />
        <p>
            <strong>wind: </strong> {weather.wind_speed} mph
            direction {weather.wind_dir}
        </p>
    </div>
)

export default Weather
