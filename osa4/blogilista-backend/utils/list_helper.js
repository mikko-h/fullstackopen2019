const dummy = () => 1

const favoriteBlog = blogs => blogs.reduce(
  (favorite, blog) => ((favorite && favorite.likes >= blog.likes) ? favorite : blog),
  undefined
)

const totalLikes = blogs => blogs.reduce((sum, blog) => sum + blog.likes, 0)

module.exports = {
  dummy,
  favoriteBlog,
  totalLikes
}
