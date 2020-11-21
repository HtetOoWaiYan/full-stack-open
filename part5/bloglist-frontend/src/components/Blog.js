import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateBlog, removeBlog }) => {
	const [ viewDetail, setViewDetail ] = useState(false)

	const editBlog = () => {
		updateBlog(blog.id ,{
			title: blog.title,
			author: blog.author,
			url: blog.url,
			likes: ++blog.likes,
		})
	}

	const deleteBlog = () => {
		removeBlog(blog.id)
	}

	return (
		<div>
			{blog.title}
			<button onClick={() => setViewDetail(!viewDetail)}>
				{viewDetail ? 'hide' : 'view'}
			</button>
			{
				viewDetail &&
				<div style={{ padding: 10, margin: 10, border: '1px solid black' }}>
					<a href={blog.url}>{blog.url}</a>
					<p>likes: {blog.likes}</p>

					<button onClick={editBlog}>like</button>

					<p>by {blog.author}</p>

					<button onClick={deleteBlog}>delete</button>
				</div>
			}
		</div>
	)
}

Blog.propTypes = {
	blog: PropTypes.object.isRequired,
	updateBlog: PropTypes.func.isRequired,
	removeBlog: PropTypes.func.isRequired,
}

export default Blog
