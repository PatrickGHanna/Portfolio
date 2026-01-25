import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

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
