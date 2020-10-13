import React, { useState } from 'react'

const PersonForm = props => (
    <form onSubmit={props.addPerson}>
        <div>
            name: &nbsp;
            <input
                onChange={props.handleNameChange}
                value={props.newName}
            />
        </div>
        <div>
            number: &nbsp;
            <input
                onChange={props.handleNumberChange}
                value={props.newNumber}
            />
        </div>
        <div>
            <button type="submit">add</button>
        </div>
    </form>
)

export default PersonForm
