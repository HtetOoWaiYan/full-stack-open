import React from 'react'

const Blog = ({ blog }) => (
  <div>
    {blog.title} <em>by</em> {blog.author}
  </div>
)

export default Blog
