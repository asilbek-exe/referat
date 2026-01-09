import axios from 'axios'
import type {
  User,
  Task,
  Submission,
  Progress,
  Resource,
  OverallProgress,
  LoginCredentials,
  RegisterData,
} from '../types'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Handle token expiration
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Auth API
export const authAPI = {
  login: async (credentials: LoginCredentials) => {
    const formData = new FormData()
    formData.append('username', credentials.username)
    formData.append('password', credentials.password)
    const response = await axios.post(`${API_BASE_URL}/auth/login`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return response.data
  },
  register: async (data: RegisterData) => {
    const response = await apiClient.post('/auth/register', data)
    return response.data
  },
  getMe: async (): Promise<User> => {
    const response = await apiClient.get('/auth/me')
    return response.data
  },
}

// Tasks API
export const tasksAPI = {
  getAll: async (): Promise<Task[]> => {
    const response = await apiClient.get('/tasks')
    return response.data
  },
  getById: async (id: number): Promise<Task> => {
    const response = await apiClient.get(`/tasks/${id}`)
    return response.data
  },
  create: async (data: Partial<Task>): Promise<Task> => {
    const response = await apiClient.post('/tasks', data)
    return response.data
  },
  update: async (id: number, data: Partial<Task>): Promise<Task> => {
    const response = await apiClient.put(`/tasks/${id}`, data)
    return response.data
  },
  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/tasks/${id}`)
  },
}

// Submissions API
export const submissionsAPI = {
  submit: async (taskId: number, file: File | null, textContent: string | null) => {
    const formData = new FormData()
    if (file) {
      formData.append('file', file)
    }
    if (textContent) {
      formData.append('text_content', textContent)
    }
    const token = localStorage.getItem('token')
    const response = await axios.post(
      `${API_BASE_URL}/submissions/tasks/${taskId}/submit`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      }
    )
    return response.data
  },
  getMySubmissions: async (): Promise<Submission[]> => {
    const response = await apiClient.get('/submissions/me')
    return response.data
  },
  getAll: async (): Promise<Submission[]> => {
    const response = await apiClient.get('/submissions/all')
    return response.data
  },
}

// Progress API
export const progressAPI = {
  getMyProgress: async (): Promise<Progress[]> => {
    const response = await apiClient.get('/progress/me')
    return response.data
  },
  getOverallProgress: async (): Promise<OverallProgress> => {
    const response = await apiClient.get('/progress/me/overall')
    return response.data
  },
  update: async (userId: number, taskId: number, progressValue: number): Promise<Progress> => {
    const response = await apiClient.put(`/progress/${userId}/${taskId}`, {
      progress_value: progressValue,
    })
    return response.data
  },
}

// Resources API
export const resourcesAPI = {
  getAll: async (): Promise<Resource[]> => {
    const response = await apiClient.get('/resources')
    return response.data
  },
  create: async (data: Partial<Resource>): Promise<Resource> => {
    const response = await apiClient.post('/resources', data)
    return response.data
  },
  update: async (id: number, data: Partial<Resource>): Promise<Resource> => {
    const response = await apiClient.put(`/resources/${id}`, data)
    return response.data
  },
  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/resources/${id}`)
  },
}

export default apiClient

