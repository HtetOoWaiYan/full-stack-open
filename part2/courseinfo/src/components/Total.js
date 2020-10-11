import React from 'react';

const Total = ({ parts }) => {
    const exercises = parts.map(part => part.exercises)

    const total = exercises.reduce((s, p) => s + p)

    return (
        <p><strong>total of {total} exercises</strong></p>
    )
}

export default Total
