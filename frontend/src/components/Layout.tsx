import { Outlet, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { LogOut, BookOpen, Home, Settings, FileText } from 'lucide-react'

const Layout = () => {
  const { user, logout, isAdmin } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center flex-1 min-w-0">
              <div className="flex-shrink-0 flex items-center">
                <BookOpen className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
                <span className="ml-2 text-base sm:text-xl font-bold text-gray-900 truncate">
                  Language Learning
                </span>
              </div>
              <div className="hidden md:ml-6 md:flex md:space-x-8">
                <Link
                  to="/dashboard"
                  className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
                >
                  <Home className="h-4 w-4 mr-1" />
                  Dashboard
                </Link>
                <Link
                  to="/resources"
                  className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
                >
                  <FileText className="h-4 w-4 mr-1" />
                  Resources
                </Link>
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  >
                    <Settings className="h-4 w-4 mr-1" />
                    Admin Panel
                  </Link>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <span className="hidden sm:inline text-xs sm:text-sm text-gray-700 truncate max-w-[100px] sm:max-w-none">
                {user?.full_name || user?.username}
                {isAdmin && <span className="ml-1 text-blue-600">(Admin)</span>}
              </span>
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-2 sm:px-4 py-2 border border-transparent text-xs sm:text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
              >
                <LogOut className="h-4 w-4 sm:mr-1" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
          {/* Mobile menu */}
          <div className="md:hidden border-t border-gray-200 py-2">
            <div className="flex space-x-4">
              <Link
                to="/dashboard"
                className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
              >
                <Home className="h-4 w-4 mr-1" />
                Dashboard
              </Link>
              <Link
                to="/resources"
                className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
              >
                <FileText className="h-4 w-4 mr-1" />
                Resources
              </Link>
              {isAdmin && (
                <Link
                  to="/admin"
                  className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
                >
                  <Settings className="h-4 w-4 mr-1" />
                  Admin
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-4 sm:py-6 px-4 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout

