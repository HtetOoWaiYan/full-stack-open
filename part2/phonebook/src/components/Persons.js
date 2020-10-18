import React from 'react'

const Persons = ({ persons, newFilter, deletePerson }) => (
    <div>
        {
            persons
            .filter(person =>
                person.name
                .toLowerCase()
                .includes(newFilter.toLowerCase())
            )
            .map(person =>
                <p key={person.id}>
                    {person.name} {person.number}
                    <button onClick={() => deletePerson(person.id)}>
                        delete
                    </button>
                </p>
            )
        }
    </div>
)

export default Persons
