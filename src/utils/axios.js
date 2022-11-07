import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: false
})
// 响应拦截器
axios.interceptors.response.use(
  res => res.data,
  err => Promise.reject(err)
)

export function request(config) {
  return instance(config)
}
