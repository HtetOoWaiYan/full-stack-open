import React from 'react'

const Languages = ({ country }) => (
    <div>
        <h3>Spoken languages</h3>
        <ul>
            {
                country.languages.map(language => (
                    <li key={language.iso639_2}>{language.name}</li>
                ))
            }
        </ul>
    </div>
)

export default Languages
