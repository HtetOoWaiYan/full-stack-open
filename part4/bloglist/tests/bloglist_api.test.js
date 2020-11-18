const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
	await Blog.deleteMany({})

	for (let blog of helper.initialBlogs) {
		let blogObject = new Blog(blog)
		await blogObject.save()
	}
})

describe('when there is initially some blogs saved', () => {
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
})

describe('addition of a new blog', () => {
	let login = {}

	beforeEach(async () => {
		await User.deleteMany({})

		const passwordHash = await bcrypt.hash('root', 10)
		const user = new User({ username: 'root', passwordHash })

		await user.save()

		login = await api
			.post('/api/login')
			.send({ 'username': 'root', 'password': 'root' })
			.expect(200)
			.expect('Content-Type', /application\/json/)

	})

	test('succeeds with valid token and data', async () => {
		const newBlog = {
			title: 'Test: Creating Blog',
			author: 'Mr. Tester',
			url: 'https://test.com/1',
			likes: 2
		}

		await api
			.post('/api/blogs')
			.set('Authorization', `bearer ${login.body.token}`)
			.send(newBlog)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		const blogsAtEnd = await helper.blogsInDb()
		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

		const titles = blogsAtEnd.map(b => b.title)
		expect(titles).toContain(
			'Test: Creating Blog'
		)
	})

	test('without \'likes\' property defaults \'likes\' value to 0', async () => {
		const newBlog = {
			title: 'Test: Creating Blog Without likes Property',
			author: 'Mr. Tester',
			url: 'https://test.com/2'
		}

		await api
			.post('/api/blogs')
			.set('Authorization', `bearer ${login.body.token}`)
			.send(newBlog)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		const blogsAtEnd = await helper.blogsInDb()
		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

		const blogAdded = blogsAtEnd[blogsAtEnd.length - 1]

		expect(blogAdded.likes).toBe(0)
	})

	test('fails with status code 400 if the request does\'t include title & url properties', async () => {
		const newBlog = {
			author: 'Mr. Tester',
			likes: 5
		}

		await api
			.post('/api/blogs')
			.set('Authorization', `bearer ${login.body.token}`)
			.send(newBlog)
			.expect(400)

		const blogsAtEnd = await helper.blogsInDb()
		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
	})

	test('fails with status code 401 if the token is not provided', async () => {
		const newBlog = {
			title: 'Test: Token not provided',
			author: 'Mr. Tester',
			url: 'https://test.com/4',
			likes: 8
		}

		await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(401)

		const blogsAtEnd = await helper.blogsInDb()
		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
	})
})

describe('deletion of a blog', () => {
	test('succeeds with status code 204 if id is valid', async () => {
		const blogsAtStart = await helper.blogsInDb()
		const blogToDelete = blogsAtStart[0]

		await api
			.delete(`/api/blogs/${blogToDelete.id}`)
			.expect(204)

		const blogsAtEnd = await helper.blogsInDb()

		expect(blogsAtEnd).toHaveLength(
			helper.initialBlogs.length - 1
		)

		const titles = blogsAtEnd.map(b => b.title)

		expect(titles).not.toContain(blogToDelete.title)
	})
})

describe('updating of a blog', () => {
	test('succeeds with a new \'likes\' value', async () => {
		const blogsAtStart = await helper.blogsInDb()
		const blogToUpdate = blogsAtStart[0]

		const newBlog = {
			title: 'How to be a better coder',
			author: 'Mr. Coder',
			url: 'https://example.com/1',
			likes: 10
		}

		await api
			.put(`/api/blogs/${blogToUpdate.id}`)
			.send(newBlog)
			.expect(200)
			.expect('Content-Type', /application\/json/)

		const blogsAtEnd = await helper.blogsInDb()

		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

		const updatedBlog = blogsAtEnd[0]

		expect(updatedBlog.likes).toBe(10)
	})
})

afterAll(() => {
	mongoose.connection.close()
})