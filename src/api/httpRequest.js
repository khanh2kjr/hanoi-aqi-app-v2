import axios from 'axios'

const BASE_URL = 'http://localhost:8000/api'

export const httpRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

axios.interceptors.request.use(
  (config) => config,
  (err) => Promise.reject(err)
)

axios.interceptors.response.use(
  (res) => res.data,
  (err) => Promise.reject(err)
)
