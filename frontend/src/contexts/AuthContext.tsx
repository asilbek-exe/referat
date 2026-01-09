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
        console.log('Loaded user from storage:', parsedUser)
        console.log('User role:', parsedUser.role, 'Type:', typeof parsedUser.role)
        setUser(parsedUser)
        // Verify token is still valid and refresh user data
        authAPI.getMe()
          .then((freshUserData) => {
            console.log('Fresh user data from API:', freshUserData)
            setUser(freshUserData)
            localStorage.setItem('user', JSON.stringify(freshUserData))
          })
          .catch(() => {
            logout()
          })
      } catch (error) {
        logout()
      }
    }
    setLoading(false)
  }, [])

  const login = async (credentials: LoginCredentials) => {
    const response = await authAPI.login(credentials)
    localStorage.setItem('token', response.access_token)
    
    const userData = await authAPI.getMe()
    console.log('User data from API:', userData)
    console.log('User role:', userData.role, 'Type:', typeof userData.role)
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
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

