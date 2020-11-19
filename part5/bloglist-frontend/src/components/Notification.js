import React from 'react'

const Notification = ({ message }) => {
    if (message === null) {
        return null
    }

    return (
        <div style={{ border: "1px solid black", padding: 8 }}>
            {message}
        </div>
    )
}

export default Notification
