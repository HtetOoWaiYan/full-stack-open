import React from 'react'
import Country from './Country'

const Countries = ({ showCountries, handleShow }) => {
    let show = <p>Too many matches, specify another filter</p>

    if (showCountries.length === 1) {
        show = <Country country={showCountries} />
    }
    else if (showCountries.length < 10) {
        show = showCountries.map(country =>
            <p key={country.alpha3Code}>
                {country.name}
                <button onClick={() => handleShow(country.name)}>show</button>
            </p>
        )
    }

    return show
}

export default Countries
