import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Info from './Info'
import Languages from './Languages'
import Flag from './Flag'
import Weather from './Weather'

const API_KEY = process.env.REACT_APP_WEATHERSTACK_API_KEY

const Country = ({ country })=> {
    const showCountry = country[0]

    const [ weather, setWeather ] = useState([])

    useEffect(() => {
        axios
            .get(`http://api.weatherstack.com/current?access_key=${API_KEY}&query=${showCountry.capital}`)
            .then(response => {
                setWeather(response.data.current)
            })
    }, [ showCountry.capital ])

    return (
        <div>
            <Info country={showCountry} />
            <Languages country={showCountry} />
            <Flag country={showCountry} />
            <Weather
                capital={showCountry.capital}
                weather={weather}
            />
        </div>
    )
}

export default Country
