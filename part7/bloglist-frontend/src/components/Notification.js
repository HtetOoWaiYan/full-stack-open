import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
	const notification = useSelector(s => s.notification)

	if (notification === null) {
		return null
	}

	return (
		<div style={{ border: '1px solid black', padding: 8 }}>
			{notification}
		</div>
	)
}

export default Notification
