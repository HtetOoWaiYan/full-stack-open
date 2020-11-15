const Blog = require('../models/blog')

const initialBlogs = [
	{
		title: 'How to be a better coder',
		author: 'Mr. Coder',
		url: 'https://example.com/1',
		likes: 8
	},
	{
		title: 'Learn React with these 3 steps',
		author: 'Mr. React',
		url: 'https://example.com/2',
		likes: 3
	},
]

const blogsInDb = async () => {
	const blogs = await Blog.find({})
	return blogs.map(blog => blog.toJSON())
}

module.exports = {
	initialBlogs, blogsInDb
}