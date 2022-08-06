import axios from 'axios'
const BASEURL = '/api/login'

const login = async credentials => {
  console.log('credentials from login', credentials)
  const response = await axios.post(BASEURL, credentials)
  return response.data
}

export default { login }