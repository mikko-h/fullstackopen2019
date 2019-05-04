
import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = (newBlog, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  return axios
    .post(baseUrl, newBlog, config)
    .then(response => response.data)
}

export default {
  getAll,
  create
}
