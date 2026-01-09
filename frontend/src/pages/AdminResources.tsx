import { useEffect, useState } from 'react'
import { resourcesAPI } from '../api/client'
import type { Resource } from '../types'
import { Plus, Edit, Trash2, ExternalLink } from 'lucide-react'

const AdminResources = () => {
  const [resources, setResources] = useState<Resource[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingResource, setEditingResource] = useState<Resource | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    description: '',
    category: 'other' as Resource['category'],
  })

  useEffect(() => {
    loadResources()
  }, [])

  const loadResources = async () => {
    try {
      const data = await resourcesAPI.getAll()
      setResources(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Failed to load resources:', error)
      setResources([])
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = () => {
    setEditingResource(null)
    setFormData({
      title: '',
      url: '',
      description: '',
      category: 'other',
    })
    setShowModal(true)
  }

  const handleEdit = (resource: Resource) => {
    setEditingResource(resource)
    setFormData({
      title: resource.title,
      url: resource.url,
      description: resource.description || '',
      category: resource.category,
    })
    setShowModal(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this resource?')) return
    try {
      await resourcesAPI.delete(id)
      await loadResources()
    } catch (error) {
      console.error('Failed to delete resource:', error)
      alert('Failed to delete resource')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingResource) {
        await resourcesAPI.update(editingResource.id, formData)
      } else {
        await resourcesAPI.create(formData)
      }
      setShowModal(false)
      await loadResources()
    } catch (error) {
      console.error('Failed to save resource:', error)
      alert('Failed to save resource')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  return (
    <div className="px-4 py-4 sm:py-6 sm:px-0">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Resource Management</h1>
        <button
          onClick={handleCreate}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 w-full sm:w-auto"
        >
          <Plus className="h-5 w-5 mr-2" />
          Create Resource
        </button>
      </div>

      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {Array.isArray(resources) && resources.length > 0 ? resources.map((resource) => (
          <div key={resource.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{resource.title}</h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(resource)}
                  className="text-blue-600 hover:text-blue-900"
                >
                  <Edit className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleDelete(resource.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
            {resource.description && (
              <p className="text-sm text-gray-600 mb-4">{resource.description}</p>
            )}
            <div className="mb-4">
              <span className="px-2 py-1 text-xs font-semibold rounded bg-gray-100 text-gray-800">
                {resource.category}
              </span>
            </div>
            <a
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm"
            >
              Visit Resource
              <ExternalLink className="h-4 w-4 ml-1" />
            </a>
          </div>
        )) : null}
      </div>

      {(!Array.isArray(resources) || resources.length === 0) && (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <p className="text-gray-500">No resources created yet.</p>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-10 sm:top-20 mx-auto p-4 sm:p-5 border w-full max-w-md sm:w-96 shadow-lg rounded-md bg-white m-4">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              {editingResource ? 'Edit Resource' : 'Create Resource'}
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">URL</label>
                <input
                  type="url"
                  required
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows={3}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value as Resource['category'] })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="dictionary">Dictionary</option>
                  <option value="grammar">Grammar</option>
                  <option value="exchange">Language Exchange</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  {editingResource ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminResources

