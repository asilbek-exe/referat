import { useEffect, useState } from 'react'
import { AlertCircle, X } from 'lucide-react'

export default function BackendStatus() {
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    // Check if backend is available by hitting the health endpoint
    const checkBackend = async () => {
      try {
        // Get API URL from environment
        const apiUrl = import.meta.env.VITE_API_URL || 
          (import.meta.env.MODE === 'production' 
            ? '' 
            : 'http://localhost:8000/api/v1')
        
        if (!apiUrl) {
          setIsAvailable(false)
          return
        }

        // Remove /api/v1 from base URL to get root, or use as-is if no /api/v1
        const baseUrl = apiUrl.includes('/api/v1') 
          ? apiUrl.replace('/api/v1', '')
          : apiUrl.replace(/\/$/, '') // Remove trailing slash
        
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 3000) // 3 second timeout
        
        const response = await fetch(`${baseUrl}/health`, {
          method: 'GET',
          signal: controller.signal,
        })
        
        clearTimeout(timeoutId)
        setIsAvailable(response.ok)
      } catch (error) {
        setIsAvailable(false)
      }
    }

    checkBackend()
  }, [])

  if (dismissed || isAvailable === null || isAvailable) {
    return null
  }

  return (
    <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <AlertCircle className="h-5 w-5 text-red-400" />
        </div>
        <div className="ml-3 flex-1">
          <h3 className="text-sm font-medium text-red-800">
            Backend API Not Available
          </h3>
          <div className="mt-2 text-sm text-red-700">
            <p>
              The application cannot connect to the backend server. 
              This application requires a backend server to function.
            </p>
            <p className="mt-2">
              <strong>For local development:</strong> Make sure the backend is running:
            </p>
            <code className="block mt-1 p-2 bg-red-100 rounded text-xs">
              cd backend && uvicorn app.main:app --reload
            </code>
            <p className="mt-2">
              <strong>For production:</strong> The backend API URL needs to be configured.
            </p>
          </div>
        </div>
        <div className="ml-auto pl-3">
          <button
            onClick={() => setDismissed(true)}
            className="text-red-400 hover:text-red-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

