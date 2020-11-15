const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({})

	response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
	let blog = new Blog(request.body)

	if (!request.body.likes) {
		blog = new Blog({
			title: request.body.title,
			author: request.body.author,
			url: request.body.url,
			likes: 0
		})
	}

	const savedBlog = await blog.save()
	response.status(201).json(savedBlog)
})

module.exports = blogsRouter