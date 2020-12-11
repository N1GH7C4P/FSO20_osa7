import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getOne = (id) => {
  const request = axios.get(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {

  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)

  return response.data
}

const update = (id, object) => {
  const request = axios.put(`${baseUrl}/${id}`, object)
  return request.then(response => response.data)
}

const createComment = async (newObject) => {
  const response = await axios.post(`${baseUrl}/${newObject.blog.id}/comments`, newObject)
  return response.data
}

const remove = (removeId) => {
  const request = axios.delete(`${baseUrl}/${removeId}`)
  return request.then(response => response.data)
}

export default {
  createComment: createComment,
  getOne: getOne,
  getAll: getAll,
  create: create,
  update: update,
  remove: remove,
  setToken: setToken
}
