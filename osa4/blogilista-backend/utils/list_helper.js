const dummy = () => 1

const favoriteBlog = blogs => blogs.reduce(
  (favorite, blog) => ((favorite && favorite.likes >= blog.likes) ? favorite : blog),
  undefined
)

const isKnownAuthor = (list, author) => list.find(item => item.author === author) !== undefined

const blogsByAuthor = blogs => blogs.reduce((counts, blog) =>
  isKnownAuthor(counts, blog.author)
    ? counts.map(item => item.author === blog.author ? { ...item, blogs: item.blogs + 1 } : item)
    : [...counts, { author: blog.author, blogs: 1 }], [])

const mostBlogs = blogs => blogsByAuthor(blogs).reduce(
  (most, author) => ((most && most.blogs >= author.blogs) ? most : author),
  undefined
)

const totalLikes = blogs => blogs.reduce((sum, blog) => sum + blog.likes, 0)

module.exports = {
  dummy,
  favoriteBlog,
  mostBlogs,
  totalLikes
}
