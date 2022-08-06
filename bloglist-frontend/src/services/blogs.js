import axios from 'axios'
const BASEURL = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

/*
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}
*/
const getAll = async () => {
  const response = await axios.get(BASEURL)
  return response.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(BASEURL, newObject, config)
  return response.data
}

const update = async updatedObject => {
  const response = await axios.put(`${BASEURL}/${updatedObject.id}`, updatedObject)
  return response.data
}

const remove = async blogToDelete => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${BASEURL}/${blogToDelete.id}`, config)
  return response.data
}

export default { getAll, create, setToken, update, remove }