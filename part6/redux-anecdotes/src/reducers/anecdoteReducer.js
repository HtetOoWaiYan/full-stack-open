import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
	switch (action.type) {
		case 'INIT_ANECDOTES':
			return action.data
		case 'ADD_ANECDOTE': {
			return [...state, action.data]
		}
		case 'ADD_VOTE': {
			const id = action.data.id

			return state.map(a => a.id !== id ? a : action.data)
		}

		default:
			return state
	}
}

export const initializeAnecdotes = () => {
	return async dispatch => {
		const anecdotes = await anecdoteService.getAll()
		dispatch({
			type: 'INIT_ANECDOTES',
			data: anecdotes
		})
	}
}

export const createAnecdote = content => {
	return async dispatch => {
		const newAnecdote = await anecdoteService.createNew(content)

		dispatch({
			type: 'ADD_ANECDOTE',
			data: newAnecdote
		})
	}
}

export const incrementVote = anecdote => {
	return async dispatch => {
		const updatedAnecdote = await anecdoteService.addVote(anecdote)

		dispatch({
			type: 'ADD_VOTE',
			data: updatedAnecdote
		})
	}
}

export default reducer