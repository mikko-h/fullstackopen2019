const blogs = [
  {
    id: '1',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html'
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll }
