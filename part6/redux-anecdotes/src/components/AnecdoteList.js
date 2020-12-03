import React from 'react'
import { connect } from 'react-redux'
import { incrementVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = props => {
	const anecdotes = props.anecdotes
	const filter = props.filter

	const changeVote = anecdote => {
		props.incrementVote(anecdote)

		props.setNotification(`You voted '${anecdote.content}'`, 4000)
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

const mapStateToProps = state => {
	return {
		anecdotes: state.anecdotes,
		filter: state.filter,
	}
}

const mapDispatchToProps = {
	incrementVote,
	setNotification
}

const ConnectedAnecdoteList = connect(
	mapStateToProps,
	mapDispatchToProps
)(AnecdoteList)

export default ConnectedAnecdoteList