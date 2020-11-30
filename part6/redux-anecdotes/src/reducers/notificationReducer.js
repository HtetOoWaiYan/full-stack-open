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

export const setNotification = (notification, time) => {
	return async dispatch => {
		dispatch({
			type: 'SET_NOTI',
			notification
		})

		setTimeout(() => {
			dispatch({
				type: 'REMOVE_NOTI'
			})
		}, time)
	}
} 

export default notificationReducer