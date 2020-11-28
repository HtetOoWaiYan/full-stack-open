const notificationReducer = (state = null, action) => {
	switch (action.type) {
		case 'SET_NOTI':
			return action.notification
		case 'REMOVE_NOTI':
			return null
		default:
			return state
	}
}

export const setNotification = notification => {
	return {
		type: 'SET_NOTI',
		notification
	}
} 

export const removeNotification = () => {
	return {
		type: 'REMOVE_NOTI',
	}
} 

export default notificationReducer