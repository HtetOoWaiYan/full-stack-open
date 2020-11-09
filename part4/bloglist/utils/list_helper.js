const dummy = (blogs) => {
	return 1
}

const totalLikes = (blogs) => {
	const reducer = (sum, currentValue) => sum + currentValue

	const likes = blogs.map(blog => blog.likes)

	return likes.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
	const likes = blogs.map(blog => blog.likes)
	const maxLike = likes.indexOf(Math.max(...likes))

	const favorite = blogs[maxLike]

	return {
		title: favorite.title,
		author: favorite.author,
		likes: favorite.likes
	}
}

const mostBlogs = (blogs) => {
	let authorNames = []
	let authorBlogs = []

	blogs.forEach(blog => {
		const found = authorNames.find(author => author === blog.author)

		if (!found) {
			authorNames.push(blog.author)
			authorBlogs.push(1)
		} else {
			const authorIndex = authorNames.findIndex(author => author === blog.author)

			authorBlogs[authorIndex]++
		}
	})

	const mostBlogsIndex = authorBlogs.indexOf(Math.max(...authorBlogs))

	const mostBlogsAuthor = {
		author: authorNames[mostBlogsIndex],
		blogs: authorBlogs[mostBlogsIndex]
	}

	return mostBlogsAuthor
}

const mostLikes = (blogs) => {
	let authorNames = []
	let authorLikes = []

	blogs.forEach(blog => {
		const found = authorNames.find(author => author === blog.author)

		if (!found) {
			authorNames.push(blog.author)
			authorLikes.push(blog.likes)
		} else {
			const authorIndex = authorNames.findIndex(author => author === blog.author)

			authorLikes[authorIndex] += blog.likes
		}
	})

	const mostLikesIndex = authorLikes.indexOf(Math.max(...authorLikes))

	const mostLikesAuthor = {
		author: authorNames[mostLikesIndex],
		likes: authorLikes[mostLikesIndex]
	}

	return mostLikesAuthor
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes
}