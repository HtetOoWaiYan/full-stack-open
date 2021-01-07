import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import loginService from './services/login'
import blogService from './services/blogs'

import { initializeBlogs } from './reducers/blogReducer'
import { setNotification } from './reducers/notificationReducer'

const App = () => {
	const dispatch = useDispatch()

	const blogs = useSelector(state => state.blogs)
	const [user, setUser] = useState(null)
	const [formVisible, setFormVisible] = useState(false)

	useEffect(() => {
		dispatch(initializeBlogs())
	}, [dispatch])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedInUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
			blogService.setToken(user.token)
		}
	}, [])

	const createLogin = async loginObject => {
		try {
			const user = await loginService
				.login(loginObject)

			window.localStorage.setItem(
				'loggedInUser', JSON.stringify(user)
			)

			blogService.setToken(user.token)
			setUser(user)
		} catch (exception) {
			dispatch(setNotification('Wrong credentials', 4000))
		}
	}

	const handleLogout = () => {
		window.localStorage.removeItem('loggedInUser')
		setUser(null)
	}

	if (user === null) {
		return (
			<div>
				<Notification />
				<LoginForm createLogin={createLogin} />
			</div>
		)
	}

	return (
		<div>
			<h2>blogs</h2>
			<p>{user.name} logged in.</p>
			<button onClick={handleLogout}>log out</button>
			<Notification />
			{
				formVisible
					? <div>
						<BlogForm />
						<button onClick={() => setFormVisible(false)}>cancel</button>
					</div>
					: <button onClick={() => setFormVisible(true)}>new blog</button>
			}

			<h3>blogs</h3>
			<ul style={{ listStyle: 'none', padding: 0 }}>
				{blogs
					.sort((a, b) => b.likes - a.likes)
					.map(blog =>
						<Blog
							key={blog.id}
							blog={blog}
						/>
					)}
			</ul>
		</div>
	)
}

export default App