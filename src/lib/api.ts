import axios from 'axios';
const ACCESS_TOKEN = "access";
const REFRESH_TOKEN = "refresh"
const api = axios.create({
  baseURL: 'http://localhost:8000/'
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }

)

export default api 