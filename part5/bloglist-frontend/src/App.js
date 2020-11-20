import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import loginService from './services/login'
import blogService from './services/blogs'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [user, setUser] = useState(null)
	const [message, setMessage] = useState(null)
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [formVisible, setFormVisible] = useState(false)

	useEffect(() => {
		blogService.getAll().then(blogs =>
			setBlogs(blogs)
		)
	}, [])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedInUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
			blogService.setToken(user.token)
		}
	}, [])

	const handleLogin = async (event) => {
		event.preventDefault()

		try {
			const user = await loginService
				.login({ username, password })

			window.localStorage.setItem(
				'loggedInUser', JSON.stringify(user)
			)

			blogService.setToken(user.token)
			setUser(user)
			setUsername('')
			setPassword('')
		} catch (exception) {
			setMessage('Wrong credentials')
			setTimeout(() => {
				setMessage(null)
			}, 4000)
		}
	}

	const handleLogout = () => {
		window.localStorage.removeItem('loggedInUser')
		setUser(null)
	}

	const addBlog = async blogObject => {
		const addedBlog = await blogService
			.create(blogObject)

		setBlogs(blogs.concat(addedBlog))	
		
		setMessage(`'${addedBlog.title}' by ${addedBlog.author} added.`)
		setTimeout(() => {
			setMessage(null)
			setFormVisible(false)
		}, 3000)
	}

	const updateBlog = async (id, blogObject) => {
		const updatedBlog = await blogService
			.update(id, blogObject)

		const newBlogs = blogs.map(blog => {
			if (blog.id === id) {
				return { ...blog, likes: updatedBlog.likes }
			}
			return blog
		})

		setBlogs(newBlogs)
	}

	const removeBlog = async id => {
		await blogService
			.remove(id)

		const newBlogs = blogs.filter(blog => blog.id !== id)

		setBlogs(newBlogs)
	}

	if (user === null) {
		return (
			<LoginForm 
				message={message}	
				handleLogin={handleLogin}
				username={username}
				password={password}
				setUsername={setUsername}
				setPassword={setPassword}
			/>
		)
	}

	return (
		<div>
			<h2>blogs</h2>
			<p>{user.name} logged in.</p>
			<button onClick={handleLogout}>log out</button>
			<Notification message={message} />
			{
				formVisible
				? <div>
					<BlogForm addBlog={addBlog} />
					<button onClick={() => setFormVisible(false)}>cancel</button>
				</div>				
				: <button onClick={() => setFormVisible(true)}>new blog</button>
			}
			
			<h3>blogs</h3>
			{blogs
				.sort((a, b) => b.likes - a.likes)
				.map(blog =>
					<Blog 
						key={blog.id} 
						blog={blog} 
						updateBlog={updateBlog}
						removeBlog={removeBlog}
					/>
			)}
		</div>
	)
}

export default App