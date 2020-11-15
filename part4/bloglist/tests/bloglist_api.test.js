const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
	await Blog.deleteMany({})

	for (let blog of helper.initialBlogs) {
		let blogObject = new Blog(blog)
		await blogObject.save()
	}
})

test('blogs are returned as json', async () => {
	await api
		.get('/api/blogs')
		.expect(200)
		.expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
	const response = await api.get('/api/blogs')

	expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('unique identifier property of blogs is named id', async () => {
	const response = await api.get('/api/blogs')

	expect(response.body[0].id).toBeDefined()
})

test('a valid blog can be added', async () => {
	const newBlog = {
		title: 'New blog for testing blog-create',
		author: 'Mr. Tester',
		url: 'https://test.com/1',
		likes: 4
	}

	await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(201)
		.expect('Content-Type', /application\/json/)

	const blogsAtEnd = await helper.blogsInDb()
	expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

	const titles = blogsAtEnd.map(b => b.title)
	expect(titles).toContain(
		'New blog for testing blog-create'
	)
})

test('adding blog without likes property defaults the likes value to 0', async () => {
	const newBlog = {
		title: 'Blog without likes property',
		author: 'Mr. Tester',
		url: 'https://test.com/2'
	}

	await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(201)
		.expect('Content-Type', /application\/json/)

	const blogsAtEnd = await helper.blogsInDb()
	expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

	const blogAdded = blogsAtEnd[blogsAtEnd.length - 1]

	expect(blogAdded.likes).toBe(0)
})

test('adding blog without title and url properties results to 400 Bad Request', async () => {
	const newBlog = {
		author: 'Mr. Tester',
		likes: 5
	}

	await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(400)

	const blogsAtEnd = await helper.blogsInDb()
	expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

afterAll(() => {
	mongoose.connection.close()
})