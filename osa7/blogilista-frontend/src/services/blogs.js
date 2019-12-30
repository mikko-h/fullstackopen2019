
import axios from 'axios'
const baseUrl = '/api/blogs'

const config = token => ({
  headers: {
    Authorization: `Bearer ${token}`
  }
})

const getAll = () => axios
  .get(baseUrl)
  .then(response => response.data)

const create = (newBlog, token) => axios
  .post(baseUrl, newBlog, config(token))
  .then(response => response.data)

const update = ({ id, user, ...blogProps }) => axios
  .put(`${baseUrl}/${id}`, {
    ...blogProps,
    user: user && user.id
  })
  .then(response => response.data)

const remove = (id, token) => axios
  .delete(`${baseUrl}/${id}`, config(token))

export default {
  getAll,
  create,
  update,
  remove
}
