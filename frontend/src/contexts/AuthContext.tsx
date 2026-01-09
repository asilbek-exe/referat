import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { authAPI } from '../api/client'
import type { User, LoginCredentials, RegisterData } from '../types'

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (credentials: LoginCredentials) => Promise<void>
  register: (data: RegisterData) => Promise<void>
  logout: () => void
  isAdmin: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const storedUser = localStorage.getItem('user')
    
    if (token && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser)
        // Validate that parsed user is actually a user object, not HTML
        // Check if it's an object with an id property (not a string/HTML)
        if (parsedUser && typeof parsedUser === 'object' && !Array.isArray(parsedUser) && parsedUser.id && typeof parsedUser.id === 'number') {
          console.log('Loaded user from storage:', parsedUser)
          console.log('User role:', parsedUser.role, 'Type:', typeof parsedUser.role)
          setUser(parsedUser)
          // Verify token is still valid and refresh user data
          authAPI.getMe()
            .then((freshUserData) => {
              // Validate response is JSON, not HTML
              if (freshUserData && typeof freshUserData === 'object' && !Array.isArray(freshUserData) && freshUserData.id && typeof freshUserData.id === 'number') {
                console.log('Fresh user data from API:', freshUserData)
                setUser(freshUserData)
                localStorage.setItem('user', JSON.stringify(freshUserData))
              } else {
                console.error('Invalid user data received from API')
                // Keep stored user if API returns invalid data
              }
            })
            .catch((error) => {
              console.error('Failed to refresh user data:', error)
              // Only logout if it's an auth error, not a connection error
              if (error.response?.status === 401) {
                logout()
              }
              // Otherwise keep the stored user
            })
        } else {
          // Invalid stored user, clear it
          localStorage.removeItem('user')
          localStorage.removeItem('token')
        }
      } catch (error) {
        console.error('Failed to parse stored user:', error)
        localStorage.removeItem('user')
        localStorage.removeItem('token')
      }
    }
    setLoading(false)
  }, [])

  const login = async (credentials: LoginCredentials) => {
    const response = await authAPI.login(credentials)
    localStorage.setItem('token', response.access_token)
    
    const userData = await authAPI.getMe()
    // Validate response is JSON, not HTML
    // Check if it's an object with an id property (not a string/HTML)
    if (userData && typeof userData === 'object' && !Array.isArray(userData) && userData.id && typeof userData.id === 'number') {
      console.log('User data from API:', userData)
      console.log('User role:', userData.role, 'Type:', typeof userData.role)
      setUser(userData)
      localStorage.setItem('user', JSON.stringify(userData))
    } else {
      throw new Error('Invalid response from server. The API may be down or the tunnel expired.')
    }
  }

  const register = async (data: RegisterData) => {
    await authAPI.register(data)
    // Auto-login after registration
    await login({ username: data.username, password: data.password })
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
  }

  // Check if user is admin - handle both string and enum cases
  const isAdmin = user?.role === 'admin' || String(user?.role).toLowerCase() === 'admin'

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

