import React from 'react'
import Notification from './Notification'

const BlogForm = props => {
    const { 
		message,
        addBlog, 
		title, 
		author,
		url,
		setTitle, 
		setAuthor,
		setUrl
    } = props

    return (
		<div>
			<Notification message={message} />
			<h3>create new</h3>
			<form onSubmit={addBlog}>
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