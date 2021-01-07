import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

test('<BlogForm /> calls event handler with the right details when a new blog is created', () => {
	const mockHandler = jest.fn()

	const component = render(
		<BlogForm addBlog={mockHandler} />
	)

	const form = component.container.querySelector('form')
	const titleInput = component.container.querySelector('#title')
	const authorInput = component.container.querySelector('#author')
	const urlInput = component.container.querySelector('#url')

	fireEvent.change(titleInput, {
		target: { value: 'Test title' }
	})

	fireEvent.change(authorInput, {
		target: { value: 'Test author' }
	})

	fireEvent.change(urlInput, {
		target: { value: 'Test url' }
	})

	fireEvent.submit(form)

	expect(mockHandler.mock.calls).toHaveLength(1)
	expect(mockHandler.mock.calls[0][0].title).toBe('Test title')
	expect(mockHandler.mock.calls[0][0].author).toBe('Test author')
	expect(mockHandler.mock.calls[0][0].url).toBe('Test url')
})