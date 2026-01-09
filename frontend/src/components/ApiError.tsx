import { AlertCircle } from 'lucide-react'

export default function ApiError() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full mb-4">
          <AlertCircle className="w-6 h-6 text-red-600" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 text-center mb-2">
          Backend API Not Available
        </h2>
        <p className="text-gray-600 text-center mb-4">
          The application cannot connect to the backend server.
        </p>
        <div className="bg-gray-50 rounded-md p-4 mb-4">
          <p className="text-sm text-gray-700 mb-2">
            <strong>For local development:</strong>
          </p>
          <ol className="text-sm text-gray-600 list-decimal list-inside space-y-1">
            <li>Start the backend server: <code className="bg-gray-200 px-1 rounded">cd backend && uvicorn app.main:app --reload</code></li>
            <li>Make sure it's running on <code className="bg-gray-200 px-1 rounded">http://localhost:8000</code></li>
          </ol>
        </div>
        <div className="bg-blue-50 rounded-md p-4">
          <p className="text-sm text-gray-700 mb-2">
            <strong>For production:</strong>
          </p>
          <p className="text-sm text-gray-600">
            The backend API URL needs to be configured. Contact the administrator.
          </p>
        </div>
      </div>
    </div>
  )
}

