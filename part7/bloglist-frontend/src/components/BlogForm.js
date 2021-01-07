import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const BlogForm = () => {
	const dispatch = useDispatch()

	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')

	const addBlog = async event => {
		event.preventDefault()

		dispatch(createBlog({ title, author, url }))

		dispatch(setNotification(`'${title}' by ${author} added.`, 3000))

		setTitle('')
		setAuthor('')
		setUrl('')
	}

	return (
		<div>
			<h3>create new</h3>
			<form onSubmit={addBlog}>
				<div>
					title
					<input
						type="text"
						id="title"
						name="title"
						value={title}
						onChange={e => setTitle(e.target.value)}
					/>
				</div>
				<div>
					author
					<input
						type="text"
						id="author"
						name="author"
						value={author}
						onChange={e => setAuthor(e.target.value)}
					/>
				</div>
				<div>
					url
					<input
						type="text"
						id="url"
						name="url"
						value={url}
						onChange={e => setUrl(e.target.value)}
					/>
				</div>
				<button id="create-button" type="submit">create</button>
			</form>
		</div>
	)
}

export default BlogForm