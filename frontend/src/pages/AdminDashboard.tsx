import { Link } from 'react-router-dom'
import { FileText, Users, BookOpen } from 'lucide-react'

const AdminDashboard = () => {
  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Manage tasks, submissions, and resources</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Link
          to="/admin/tasks"
          className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-6"
        >
          <div className="flex items-center mb-4">
            <FileText className="h-8 w-8 text-blue-600 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900">Task Management</h2>
          </div>
          <p className="text-gray-600">
            Create, edit, and delete project-based learning tasks
          </p>
        </Link>

        <Link
          to="/admin/submissions"
          className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-6"
        >
          <div className="flex items-center mb-4">
            <Users className="h-8 w-8 text-green-600 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900">Submissions</h2>
          </div>
          <p className="text-gray-600">
            Review student submissions and update progress
          </p>
        </Link>

        <Link
          to="/admin/resources"
          className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-6"
        >
          <div className="flex items-center mb-4">
            <BookOpen className="h-8 w-8 text-purple-600 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900">Resources</h2>
          </div>
          <p className="text-gray-600">
            Manage learning resources and links
          </p>
        </Link>
      </div>
    </div>
  )
}

export default AdminDashboard

