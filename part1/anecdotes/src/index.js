import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
    const [selected, setSelected] = useState(0)
    const [points, setPoints] = useState(new Array(6).fill(0))

    let copy = [...points]

    // The index of most voted anecdote
    let most_voted = points.indexOf(Math.max(...points))
    
    // The sum of all the values in 'points' array
    let sum = points.reduce((value1, value2) => value1 + value2, 0)

    const handleVote = () => {
        copy[selected] += 1
        setPoints(copy)
    }

    const handleNext = () => {
        setSelected(Math.floor(Math.random() * props.anecdotes.length))
    }

    return (
        <div>
            <h1>Anecdote of the day</h1>
            <p>{props.anecdotes[selected]}</p>
            <p>has {points[selected]} votes</p>
            <button onClick={() => handleVote()}>vote</button>
            <button onClick={() => handleNext()}>next anecdote</button>
            {
                sum !== 0
                ? <div>
                    <h1>Anecdote with most votes</h1>
                    <p>{props.anecdotes[most_voted]}</p>
                    <p>has {points[most_voted]} votes</p>
                </div>
                : ""
            }
        </div>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)
