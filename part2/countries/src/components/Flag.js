import React from 'react'

const Flag = ({ country }) => (
    <div>
        <img
            src={country.flag}
            alt={`${country.name} flag`}
            height="100"
        />
    </div>
)

export default Flag
