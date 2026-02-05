import axios from 'axios'
const apiUrl = import.meta.env.VITE_APP_API_URL;

const API_BASE_URL = "https://portfolio-api-ina26k.azurewebsites.net/api" || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const homeApi = {
  get: () => api.get('/home'),
}

export const aboutApi = {
  get: () => api.get('/about'),
}

export const resumeApi = {
  get: () => api.get('/resume'),
}

export const projectsApi = {
  getAll: () => api.get('/projects'),
  getById: (id) => api.get(`/projects/${id}`),
}

export const healthApi = {
  check: () => api.get('/health'),
}

export default api
