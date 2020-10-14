import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'

const App = () => {
    const [ countries, setCountries ] = useState([])
    const [ newFilter, setNewFilter ] = useState('')

    useEffect(() => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                setCountries(response.data)
            })
    }, [])

    const handleFilterChange = event => setNewFilter(event.target.value)
    const handleShow = value => setNewFilter(value)
    const handleClear = () => setNewFilter("")

    const showCountries = countries
        .filter(country => country.name
            .toLowerCase()
            .includes(newFilter.toLowerCase())
        )

    return (
        <div>
            <Filter
                newFilter={newFilter}
                handleClear={handleClear}
                handleFilterChange={handleFilterChange}
            />
            {
                newFilter === ''
                ? ''
                : <Countries
                    showCountries={showCountries}
                    handleShow={handleShow}
                />
            }
        </div>
    )
}

export default App
