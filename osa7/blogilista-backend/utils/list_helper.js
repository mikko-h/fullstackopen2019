const dummy = () => 1

const withMost = (list, prop) => list.reduce(
  (most, other) => ((most && most[prop] >= other[prop]) ? most : other),
  undefined
)

const favoriteBlog = blogs => withMost(blogs, 'likes')

const isKnownAuthor = (list, author) => list.find(item => item.author === author) !== undefined

const statsByAuthor = blogs => blogs.reduce((counts, blog) =>
  isKnownAuthor(counts, blog.author)
    ? counts.map(item => item.author === blog.author
      ? { ...item, blogs: item.blogs + 1, likes: item.likes + blog.likes }
      : item)
    : [...counts, { author: blog.author, blogs: 1, likes: blog.likes }], [])

const mostBlogs = blogs => withMost(
  statsByAuthor(blogs).map(({ author, blogs }) => ({ author, blogs })),
  'blogs'
)

const mostLikes = blogs => withMost(
  statsByAuthor(blogs).map(({ author, likes }) => ({ author, likes })),
  'likes'
)

const totalLikes = blogs => blogs.reduce((sum, blog) => sum + blog.likes, 0)

module.exports = {
  dummy,
  favoriteBlog,
  mostBlogs,
  mostLikes,
  totalLikes
}
