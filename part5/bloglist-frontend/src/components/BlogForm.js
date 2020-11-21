import React, { useState } from 'react'

const BlogForm = ({ addBlog }) => {
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')

	const createBlog = event => {
		event.preventDefault()

		addBlog({
			title,
			author,
			url
		})

		setTitle('')
		setAuthor('')
		setUrl('')
	}

	return (
		<div>
			<h3>create new</h3>
			<form onSubmit={createBlog}>
				<div>
					title
					<input
						type="text"
						name="title"
						value={title}
						onChange={e => setTitle(e.target.value)}
					/>
				</div>
				<div>
					author
					<input
						type="text"
						name="author"
						value={author}
						onChange={e => setAuthor(e.target.value)}
					/>
				</div>
				<div>
					url
					<input
						type="text"
						name="url"
						value={url}
						onChange={e => setUrl(e.target.value)}
					/>
				</div>
				<button type="submit">create</button>
			</form>
		</div>
	)
}

export default BlogForm