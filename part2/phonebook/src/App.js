import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
    const [ persons, setPersons ] = useState([])

    useEffect(() => {
        personService
            .getAll()
            .then(initialPersons => {
                setPersons(initialPersons)
            })
    }, [])

    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [ newFilter, setNewFilter ] = useState('')

    const handleNameChange = event => setNewName(event.target.value)
    const handleNumberChange = event => setNewNumber(event.target.value)
    const handleFilterChange = event => setNewFilter(event.target.value)

    const addPerson = event => {
        event.preventDefault()

        const sameName = persons.find(person => person.name === newName)
        const sameNumber = persons.find(person => person.number === newNumber)

        // Different number input for existing name
        if (sameName && !sameNumber) {
            const id = sameName.id
            const personObject = { ...sameName, number: newNumber }

            personService
                .update(id, personObject)
                .then(returnedPerson => {
                    setPersons(persons.map(person =>
                        person.id !== id ? person : returnedPerson
                    ))
                    setNewName('')
                    setNewNumber('')
                })
        } else if (sameNumber) {
            alert(`${sameNumber.number} is already on the phonebook.`)
        } else {
            const personObject = {
                name: newName,
                number: newNumber
            }

            personService
                .create(personObject)
                .then(returnedPerson => {
                    setPersons(persons.concat(returnedPerson))
                    setNewName('')
                    setNewNumber('')
                })
        }
    }

    const deletePerson = id => {
        const person = persons.find(person => person.id === id)

        if (window.confirm(`Delete ${person.name}?`))
        {
            personService
                .destroy(id)
                .then(setPersons(persons.filter(
                    person => person.id !== id
                )))
        }
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter
                newFilter={newFilter}
                handleFilterChange={handleFilterChange}
            />
            <h3>add a new</h3>
            <PersonForm
                addPerson={addPerson}
                newName={newName}
                newNumber={newNumber}
                handleNameChange={handleNameChange}
                handleNumberChange={handleNumberChange}
            />
            <h3>Numbers</h3>
            <Persons
                persons={persons}
                newFilter={newFilter}
                deletePerson={deletePerson}
            />
        </div>
    )
}

export default App
