import { BrowserRouter as Router, Routes, Route, Navigate, HashRouter } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'
import Register from './pages/Register'
import StudentDashboard from './pages/StudentDashboard'
import TaskDetail from './pages/TaskDetail'
import Resources from './pages/Resources'
import AdminDashboard from './pages/AdminDashboard'
import AdminTasks from './pages/AdminTasks'
import AdminSubmissions from './pages/AdminSubmissions'
import AdminResources from './pages/AdminResources'
import Layout from './components/Layout'

// Use HashRouter for GitHub Pages compatibility (avoids 404 errors)
// For production with proper server config, you can switch to BrowserRouter
const useHashRouter = import.meta.env.VITE_USE_HASH_ROUTER === 'true' || 
                     (import.meta.env.MODE === 'production' && import.meta.env.BASE_URL !== '/')

function App() {
  // Use HashRouter for GitHub Pages, BrowserRouter for development
  const AppRouter = useHashRouter ? HashRouter : Router
  
  return (
    <AuthProvider>
      <AppRouter basename={import.meta.env.BASE_URL}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<StudentDashboard />} />
            <Route path="tasks/:id" element={<TaskDetail />} />
            <Route path="resources" element={<Resources />} />
            <Route
              path="admin"
              element={
                <ProtectedRoute adminOnly>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="admin/tasks"
              element={
                <ProtectedRoute adminOnly>
                  <AdminTasks />
                </ProtectedRoute>
              }
            />
            <Route
              path="admin/submissions"
              element={
                <ProtectedRoute adminOnly>
                  <AdminSubmissions />
                </ProtectedRoute>
              }
            />
            <Route
              path="admin/resources"
              element={
                <ProtectedRoute adminOnly>
                  <AdminResources />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </AppRouter>
    </AuthProvider>
  )
}

export default App

