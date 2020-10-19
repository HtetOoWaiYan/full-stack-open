import React from 'react'

const Notification = ({ successMessage, errorMessage }) => {
    let color = 'green'
    successMessage ? color = 'green' : color = 'red'

    const messageStyle = {
        color: color,
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        padding: 10,
        marginBottom: 10
    }

    if (successMessage === null && errorMessage === null) {
        return null
    }

    return (
        <div style={messageStyle}>
            {successMessage ? successMessage : errorMessage}
        </div>
    )
}

export default Notification
