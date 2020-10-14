import React from 'react'

const Info = ({ country }) => (
    <div>
        <h2>{country.name}</h2>
        <p>
            <strong>capital: </strong>{country.capital} <br/>
            <strong>population: </strong>{country.population}
        </p>
    </div>
)

export default Info
