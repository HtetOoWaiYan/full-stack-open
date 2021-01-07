import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { incrementLike, removeBlog } from '../reducers/blogReducer'

const Blog = ({ blog }) => {
	const dispatch = useDispatch()

	const [ viewDetail, setViewDetail ] = useState(false)

	const editBlog = () => {
		dispatch(incrementLike(blog.id ,{
			title: blog.title,
			author: blog.author,
			url: blog.url,
			likes: ++blog.likes,
		}))
	}

	const deleteBlog = () => {
		dispatch(removeBlog(blog.id))
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
}

export default Blog
