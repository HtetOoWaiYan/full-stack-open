const reducer = (state = [], action) => {
	switch (action.type) {
		case 'INIT_ANECDOTES':
			return action.data
		case 'ADD_VOTE': {
			const id = action.data.id
			const anecdoteToChange = state.find(a => a.id === id)

			const changedAnecdote = {
				...anecdoteToChange,
				votes: anecdoteToChange.votes + 1
			}

			return state.map(a => a.id !== id ? a : changedAnecdote)
		}
		case 'ADD_ANECDOTE': {
			return [...state, action.data]
		}

		default:
			return state
	}
}

export const initializeAnecdotes = anecdotes => {
	return {
		type: 'INIT_ANECDOTES',
		data: anecdotes
	}
}

export const incrementVote = id => {
	return {
		type: 'ADD_VOTE',
		data: { id }
	}
}

export const createAnecdote = data => {
	return {
		type: 'ADD_ANECDOTE',
		data
	}
}

export default reducer