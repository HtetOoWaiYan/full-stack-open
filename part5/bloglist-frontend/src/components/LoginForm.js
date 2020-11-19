import React from 'react'
import Notification from './Notification'

const LoginForm = props => {
    const { 
        message, 
        handleLogin, 
        username, 
        password,
        setUsername,
        setPassword
    } = props

    return (
        <div>
            <h2>Log in to application</h2>
            <Notification message={message} />
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