let timeOutId = undefined

const notificationReducer = (state = null, action) => {
	switch (action.type) {
		case 'SET_NOTI': {
			return action.notification
		}
		case 'REMOVE_NOTI':
			return null
		default:
			return state
	}
}

export const setNotification = (notification, time) => {
	return async dispatch => {
		clearTimeout(timeOutId)

		dispatch({
			type: 'SET_NOTI',
			notification
		})

		timeOutId = setTimeout(() => {
			dispatch({
				type: 'REMOVE_NOTI'
			})
		}, time)
	}
} 

export default notificationReducer