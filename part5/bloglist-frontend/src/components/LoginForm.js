import React, { useState } from 'react'

const LoginForm = ({ createLogin }) => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const handleLogin = event => {
		event.preventDefault()

		createLogin({
			username, password
		})

		setUsername('')
		setPassword('')
	}

	return (
		<div>
			<h2>Log in to application</h2>
			<form onSubmit={handleLogin}>
				<div>
                    username
					<input
						type="text"
						name="username"
						value={username}
						onChange={e => setUsername(e.target.value)}
					/>
				</div>
				<div>
                    password
					<input
						type="password"
						name="password"
						value={password}
						onChange={e => setPassword(e.target.value)}
					/>
				</div>
				<button type="submit">login</button>
			</form>
		</div>
	)
}

export default LoginForm