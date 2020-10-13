import React, { useState } from 'react'

const Filter = props => (
    <div>
        filter shown with &nbsp;
        <input
            onChange={props.handleFilterChange}
            value={props.newFilter}
        />
    </div>
)

export default Filter
