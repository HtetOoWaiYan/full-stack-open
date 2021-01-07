import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog /> renders', () => {
	let component

	beforeEach(() => {
		const blog = {
			title: 'Test title',
			author: 'Test author',
			url: 'Test url',
			likes: 0,
		}

		component = render(
			<Blog blog={blog} />
		)
	})

	test('renders title and author, not url or likes, by default', () => {
		expect(component.container).toHaveTextContent(
			'Test title', 'Test author'
		)

		expect(component.container).not.toHaveTextContent(
			'Test url', 'likes'
		)
	})

	test('renders url and likes when \'view\' button is clicked', () => {
		const button = component.getByText('view')
		fireEvent.click(button)

		expect(component.container).toHaveTextContent(
			'Test url', 'likes'
		)
	})
})


test('clicking \'likes\' button twice calls the event handler twice', () => {
	const blog = {
		title: 'Test title',
		author: 'Test author',
		url: 'Test url',
		likes: 0,
	}

	const mockHandler = jest.fn()

	const component = render(
		<Blog blog={blog} updateBlog={mockHandler} />
	)

	const viewButton = component.getByText('view')
	fireEvent.click(viewButton)

	const likeButton = component.getByText('like')
	fireEvent.click(likeButton)
	fireEvent.click(likeButton)

	expect(mockHandler.mock.calls).toHaveLength(2)
})