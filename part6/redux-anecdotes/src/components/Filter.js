import React from 'react'
import { connect } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = props => {
	const style = {
		marginBottom: 10
	}

	const handleChange = event => {
		props.setFilter(event.target.value)
	}

	return (
		<div style={style}>
			filter <input onChange={handleChange} />
		</div>
	)
}

const mapDispatchToProps = {
	setFilter
}

const ConnectedFilter = connect(
	null,
	mapDispatchToProps
)(Filter)

export default ConnectedFilter