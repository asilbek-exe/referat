import { useEffect, useState } from 'react'
import { resourcesAPI } from '../api/client'
import type { Resource } from '../types'
import { ExternalLink, BookOpen, FileText, Users, Globe } from 'lucide-react'

const Resources = () => {
  const [resources, setResources] = useState<Resource[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>('all')

  useEffect(() => {
    loadResources()
  }, [])

  const loadResources = async () => {
    try {
      const data = await resourcesAPI.getAll()
      setResources(data)
    } catch (error) {
      console.error('Failed to load resources:', error)
    } finally {
      setLoading(false)
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'dictionary':
        return <BookOpen className="h-5 w-5" />
      case 'grammar':
        return <FileText className="h-5 w-5" />
      case 'exchange':
        return <Users className="h-5 w-5" />
      default:
        return <Globe className="h-5 w-5" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'dictionary':
        return 'bg-blue-100 text-blue-800'
      case 'grammar':
        return 'bg-green-100 text-green-800'
      case 'exchange':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredResources =
    filter === 'all'
      ? resources
      : resources.filter((r) => r.category === filter)

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  return (
    <div className="px-4 py-6 sm:px-0">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Language Learning Resources</h1>

      <div className="mb-6">
        <div className="flex space-x-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-md ${
              filter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('dictionary')}
            className={`px-4 py-2 rounded-md ${
              filter === 'dictionary'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Dictionaries
          </button>
          <button
            onClick={() => setFilter('grammar')}
            className={`px-4 py-2 rounded-md ${
              filter === 'grammar'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Grammar
          </button>
          <button
            onClick={() => setFilter('exchange')}
            className={`px-4 py-2 rounded-md ${
              filter === 'exchange'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Language Exchange
          </button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredResources.map((resource) => (
          <div
            key={resource.id}
            className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-2 rounded ${getCategoryColor(resource.category)}`}>
                {getCategoryIcon(resource.category)}
              </div>
              <span
                className={`px-2 py-1 text-xs font-semibold rounded ${getCategoryColor(
                  resource.category
                )}`}
              >
                {resource.category}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{resource.title}</h3>
            {resource.description && (
              <p className="text-sm text-gray-600 mb-4">{resource.description}</p>
            )}
            <a
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm"
            >
              Visit Resource
              <ExternalLink className="h-4 w-4 ml-1" />
            </a>
          </div>
        ))}
      </div>

      {filteredResources.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <p className="text-gray-500">No resources available in this category.</p>
        </div>
      )}
    </div>
  )
}

export default Resources

