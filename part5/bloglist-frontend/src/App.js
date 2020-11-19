import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import loginService from './services/login'
import blogService from './services/blogs'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [user, setUser] = useState(null)
	const [message, setMessage] = useState(null)
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')

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

	const addBlog = async event => {
		event.preventDefault()
		
		const blogObject = {
			title,
			author,
			url
		}

		const addedBlog = await blogService
			.create(blogObject)

		setBlogs(blogs.concat(addedBlog))	
		setTitle('')
		setAuthor('')
		setUrl('')

		setMessage(`'${addedBlog.title}' by ${addedBlog.author} added.`)
		setTimeout(() => {
			setMessage(null)
		}, 3000)
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
			<BlogForm 
				message={message}
				addBlog={addBlog}
				title={title}
				author={author}
				url={url}
				setTitle={setTitle}
				setAuthor={setAuthor}
				setUrl={setUrl}
			/>
			<h3>blogs</h3>
			{blogs.map(blog =>
				<Blog key={blog.id} blog={blog} />
			)}
		</div>
	)
}

export default App