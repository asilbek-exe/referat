import { useEffect, useState } from 'react'
import { tasksAPI } from '../api/client'
import type { Task } from '../types'
import { Plus, Edit, Trash2, Calendar } from 'lucide-react'

const AdminTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    instructions: '',
    deadline: '',
    max_progress: 100,
  })

  useEffect(() => {
    loadTasks()
  }, [])

  const loadTasks = async () => {
    try {
      const data = await tasksAPI.getAll()
      setTasks(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Failed to load tasks:', error)
      setTasks([])
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = () => {
    setEditingTask(null)
    setFormData({
      title: '',
      description: '',
      instructions: '',
      deadline: '',
      max_progress: 100,
    })
    setShowModal(true)
  }

  const handleEdit = (task: Task) => {
    setEditingTask(task)
    setFormData({
      title: task.title,
      description: task.description || '',
      instructions: task.instructions || '',
      deadline: task.deadline ? new Date(task.deadline).toISOString().slice(0, 16) : '',
      max_progress: task.max_progress,
    })
    setShowModal(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this task?')) return
    try {
      await tasksAPI.delete(id)
      await loadTasks()
    } catch (error) {
      console.error('Failed to delete task:', error)
      alert('Failed to delete task')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const taskData = {
        ...formData,
        deadline: formData.deadline ? new Date(formData.deadline).toISOString() : null,
        max_progress: parseInt(formData.max_progress.toString()),
      }
      if (editingTask) {
        await tasksAPI.update(editingTask.id, taskData)
      } else {
        await tasksAPI.create(taskData)
      }
      setShowModal(false)
      await loadTasks()
    } catch (error) {
      console.error('Failed to save task:', error)
      alert('Failed to save task')
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
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Task Management</h1>
        <button
          onClick={handleCreate}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 w-full sm:w-auto"
        >
          <Plus className="h-5 w-5 mr-2" />
          Create Task
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="hidden sm:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Deadline
              </th>
              <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Max Progress
              </th>
              <th className="px-4 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {Array.isArray(tasks) && tasks.length > 0 ? tasks.map((task) => (
              <tr key={task.id}>
                <td className="px-4 sm:px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">{task.title}</div>
                  {task.description && (
                    <div className="text-xs sm:text-sm text-gray-500 line-clamp-1">{task.description}</div>
                  )}
                  <div className="sm:hidden mt-1 text-xs text-gray-500">
                    {task.deadline ? new Date(task.deadline).toLocaleDateString() : 'No deadline'} • {task.max_progress}%
                  </div>
                </td>
                <td className="hidden sm:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {task.deadline ? (
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(task.deadline).toLocaleDateString()}
                    </div>
                  ) : (
                    'No deadline'
                  )}
                </td>
                <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {task.max_progress}%
                </td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleEdit(task)}
                    className="text-blue-600 hover:text-blue-900 mr-2 sm:mr-4"
                  >
                    <Edit className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(task.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                </td>
              </tr>
            )) : null}
          </tbody>
        </table>
        {(!Array.isArray(tasks) || tasks.length === 0) && (
          <div className="text-center py-12">
            <p className="text-gray-500">No tasks created yet.</p>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-10 sm:top-20 mx-auto p-4 sm:p-5 border w-full max-w-md sm:w-96 shadow-lg rounded-md bg-white m-4">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              {editingTask ? 'Edit Task' : 'Create Task'}
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows={3}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Instructions</label>
                <textarea
                  value={formData.instructions}
                  onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows={4}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Deadline</label>
                <input
                  type="datetime-local"
                  value={formData.deadline}
                  onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Max Progress</label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={formData.max_progress}
                  onChange={(e) =>
                    setFormData({ ...formData, max_progress: parseInt(e.target.value) })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
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
                  {editingTask ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminTasks

