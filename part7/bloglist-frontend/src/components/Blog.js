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
		<li>
			{blog.title} <em>by</em> {blog.author}
			<button onClick={() => setViewDetail(!viewDetail)}>
				{viewDetail ? 'hide' : 'view'}
			</button>
			{
				viewDetail &&
				<div style={{ padding: 10, margin: 10, border: '1px solid black' }}>
					<a href={blog.url}>{blog.url}</a>
					<p>likes: {blog.likes}</p>
					<button id='like-button' onClick={editBlog}>like</button>
					<button onClick={deleteBlog}>delete</button>
				</div>
			}
		</li>
	)
}

Blog.propTypes = {
	blog: PropTypes.object.isRequired,
	updateBlog: PropTypes.func.isRequired,
	removeBlog: PropTypes.func.isRequired,
}

export default Blog
