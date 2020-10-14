import React from 'react'

const Filter = props => (
    <div>
        find countries &nbsp;
        <input
            onChange={props.handleFilterChange}
            value={props.newFilter}
        />
        <button onClick={props.handleClear}>clear</button>
    </div>
)

export default Filter
