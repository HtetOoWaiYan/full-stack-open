import blogService from '../services/blogs'

const reducer = (state = [], action) => {
	switch (action.type) {
		case 'INIT_BLOGS':
			return action.data
		case 'ADD_BLOG': {
			return [...state, action.data]
		}
		case 'ADD_LIKE': {
			const id = action.data.id

			return state.map(b => b.id !== id ? b : action.data)
		}
		case 'DELETE_BLOG': {
			const id = action.data

			return state.filter(b => b.id !== id)
		}

		default:
			return state
	}
}

export const initializeBlogs = () => {
	return async dispatch => {
		const blogs = await blogService.getAll()
		dispatch({
			type: 'INIT_BLOGS',
			data: blogs
		})
	}
}

export const createBlog = content => {
	return async dispatch => {
		const newBlog = await blogService.create(content)

		dispatch({
			type: 'ADD_BLOG',
			data: newBlog
		})
	}
}

export const incrementLike = (id, blog) => {
	return async dispatch => {
		const updatedBlog = await blogService.update(id, blog)

		dispatch({
			type: 'ADD_LIKE',
			data: updatedBlog
		})
	}
}

export const removeBlog = id => {
	return async dispatch => {
		await blogService.remove(id)

		console.log("top ", id)

		dispatch({
			type: 'DELETE_BLOG',
			data: id
		})
	}
}

export default reducer