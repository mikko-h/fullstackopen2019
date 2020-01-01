
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

const comment = (id, comment) => axios
  .post(`${baseUrl}/${id}/comments`, { comment })
  .then(response => response.data)

export default {
  getAll,
  create,
  update,
  remove,
  comment
}
