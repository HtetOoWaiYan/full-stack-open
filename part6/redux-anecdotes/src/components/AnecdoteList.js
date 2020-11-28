import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { incrementVote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
	const anecdotes = useSelector(state => state.anecdotes)
	const filter = useSelector(state => state.filter)
	const dispatch = useDispatch()

	const changeVote = anecdote => {
		dispatch(incrementVote(anecdote.id))

		dispatch(setNotification(`You voted '${anecdote.content}'`))
		setTimeout(() => dispatch(removeNotification()), 4000)
	} 

	return (
		<div>
			{anecdotes
				.filter(anecdote =>
					anecdote.content
						.toLowerCase()
						.includes(filter.toLowerCase())
				)
				.sort((a, b) => b.votes - a.votes)
				.map(anecdote =>
					<div key={anecdote.id}>
						<div>
							{anecdote.content}
						</div>
						<div>
							has {anecdote.votes}
							<button onClick={() => changeVote(anecdote)}>vote</button>
						</div>
					</div>
				)}
		</div>
	)
}

export default AnecdoteList