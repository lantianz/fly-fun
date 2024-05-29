import axios from 'axios'

// 创建axios实例
const http = axios.create({
  baseURL: 'http://127.0.0.1:8082',  // http://101.42.141.9:8002
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