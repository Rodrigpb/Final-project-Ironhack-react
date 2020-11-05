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

export const login = ({email, password}) =>  http.post('/login', {email, password} )
export const logout = () => http.post('/logout')
export const getToken = (token) => http.get(`/activate/${token}`)
export const getUser = (id) => http.get(`/user/${id}`)
export const createUser = (user) => http.post('/users', { user })
export const updateUser = (id, user) => http.patch(`/user/${id}`, {user})

export const newComment = (id, text) => http.post(`/space/${id}/comments`, { text })
export const deleteComment = (id) => http.delete(`/space/${id}/comments`)

export const newReview = (id, review) => http.post(`/space/${id}/review`, {review})
export const paySpace = (pay) => {
  return http.post('/create-payment-intent', pay ,{headers: {
    "Content-Type": "application/json"
  }})
}
export const deleteSpace = (id) => http.delete(`/space/${id}`) 
export const spaces = () => http.get('/spaces')
export const searchSpace = (search) => http.get(`/spaces/${search}`)
export const getSpace = (id) => http.get(`/space/${id}`)
export const newSpace = (data) => {
  const formData = new FormData()

  formData.append('title', data.title)
  for (let i = 0; i < data.files.length; i++) {
    formData.append('image[]', data.files[i])
  }
  data.service.map(service =>  formData.append('services', service))
  data.schedule.map(day =>  formData.append('day', day))
  formData.append('description', data.description)
  formData.append('direction', data.direction)
  formData.append('extraDirection', data.extraDirection)
  formData.append('city', data.city)
  formData.append('coordinates', data.coordinates.lat)
  formData.append('coordinates', data.coordinates.lng)
  formData.append('type', data.type)
  formData.append('quantity', data.quantity)
  formData.append('price', data.price)
  formData.append('available', data.scheduletype)
  formData.append('checkIn', data.timeEntry)
  formData.append('checkOut', data.timeExit)


  return http.post('/space/new', formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    }})
  
}


export const createChat = (id) => http.post(`/chat/${id}`)
export const sendMessage = (id, message) => http.post(`/addMessage/${id}`, { message })
export const getChatBetweenTwo = (id ) => http.get(`/chatBetweenTwo/${id}`)


