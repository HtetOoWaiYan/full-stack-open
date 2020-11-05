import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import personService from './services/persons'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'

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
    const [ successMessage, setSuccessMessage ] = useState(null)
    const [ errorMessage, setErrorMessage ] = useState(null)

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

                    setSuccessMessage(`Updated ${returnedPerson.name}.`)
                    setTimeout(() => {
                        setSuccessMessage(null)
                    }, 2500)
                })
                .catch(error => {
                    setErrorMessage(
                        `Person '${sameName.name}' was already removed from server`
                    )
                    setTimeout(() => {
                        setErrorMessage(null)
                    }, 3000)
                    setPersons(persons.filter(person => person.id !== id))
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

                    setSuccessMessage(`Added ${returnedPerson.name}.`)
                    setTimeout(() => {
                        setSuccessMessage(null)
                    }, 2500)
                })
                .catch(error => {
                    console.log(error.response.data)
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
            <Notification
                successMessage={successMessage}
                errorMessage={errorMessage}
            />
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
