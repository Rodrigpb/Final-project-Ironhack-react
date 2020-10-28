import axios from 'axios'

const http = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:3010",
  withCredentials: true
})

http.interceptors.response.use(function(response) {
  return response.data;
}, function (error) {
  if (error.response?.status === 401) {
    localStorage.clear()
    window.location.assign('/login')
  }
  return Promise.reject(error);
});

export const login = ({ email, password }) => http.post('/login', { email, password })
export const logout = () => http.post('/logout')
export const getToken = (token) => http.get(`/activate/${token}`)
export const getUser = (id) => http.get(`/user/${id}`)
export const createUser = (user) => http.post('/users', { user })

export const spaces = () => http.get('/spaces')
export const searchSpace = (search) => http.get(`/spaces/${search}`)
