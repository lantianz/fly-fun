import axios from 'axios'

// 创建axios实例
const http = axios.create({
  baseURL: 'http://111.67.201.175:8082/api',
  timeout: 100000
})

// axios请求拦截器
http.interceptors.request.use(config => {
  return config
}, e => Promise.reject(e))

// axios响应式拦截器
http.interceptors.response.use(res => res.data, e => {
  return Promise.reject(e)
})


export default http