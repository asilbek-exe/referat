import { useEffect, useState } from 'react'
import { submissionsAPI, tasksAPI, progressAPI } from '../api/client'
import type { Submission, Task } from '../types'
import { FileText, User, Calendar, TrendingUp } from 'lucide-react'

const AdminSubmissions = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null)
  const [progressValue, setProgressValue] = useState(0)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [submissionsData, tasksData] = await Promise.all([
        submissionsAPI.getAll(),
        tasksAPI.getAll(),
      ])
      setSubmissions(Array.isArray(submissionsData) ? submissionsData : [])
      setTasks(Array.isArray(tasksData) ? tasksData : [])
    } catch (error) {
      console.error('Failed to load data:', error)
      setSubmissions([])
      setTasks([])
    } finally {
      setLoading(false)
    }
  }

  const getTaskTitle = (taskId: number) => {
    const task = tasks.find((t) => t.id === taskId)
    return task?.title || `Task #${taskId}`
  }

  const handleUpdateProgress = async (submission: Submission) => {
    try {
      await progressAPI.update(submission.user_id, submission.task_id, progressValue)
      alert('Progress updated successfully!')
      setSelectedSubmission(null)
      await loadData()
    } catch (error) {
      console.error('Failed to update progress:', error)
      alert('Failed to update progress')
    }
  }

  const openProgressModal = async (submission: Submission) => {
    setSelectedSubmission(submission)
    try {
      const progressRecords = await progressAPI.getMyProgress()
      const progress = progressRecords.find(
        (p) => p.user_id === submission.user_id && p.task_id === submission.task_id
      )
      setProgressValue(progress?.progress_value || 0)
    } catch (error) {
      console.error('Failed to load progress:', error)
      setProgressValue(0)
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
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">Student Submissions</h1>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Student
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Task
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Submitted
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                File
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {Array.isArray(submissions) && submissions.length > 0 ? submissions.map((submission) => (
              <tr key={submission.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <User className="h-5 w-5 text-gray-400 mr-2" />
                    <div className="text-sm font-medium text-gray-900">
                      User #{submission.user_id}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{getTaskTitle(submission.task_id)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(submission.submitted_at).toLocaleString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {submission.file_name ? (
                    <div className="flex items-center text-sm text-gray-500">
                      <FileText className="h-4 w-4 mr-1" />
                      {submission.file_name}
                    </div>
                  ) : (
                    <span className="text-sm text-gray-400">Text submission</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => openProgressModal(submission)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <TrendingUp className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            )) : null}
          </tbody>
        </table>
        {(!Array.isArray(submissions) || submissions.length === 0) && (
          <div className="text-center py-12">
            <p className="text-gray-500">No submissions yet.</p>
          </div>
        )}
      </div>

      {selectedSubmission && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-10 sm:top-20 mx-auto p-4 sm:p-5 border w-full max-w-md sm:w-96 shadow-lg rounded-md bg-white m-4">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Update Progress</h3>
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">
                Task: {getTaskTitle(selectedSubmission.task_id)}
              </p>
              <p className="text-sm text-gray-600 mb-4">
                Student: User #{selectedSubmission.user_id}
              </p>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Progress (0-100)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={progressValue}
                onChange={(e) => setProgressValue(parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${progressValue}%` }}
                  />
                </div>
              </div>
            </div>
            {selectedSubmission.text_content && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Submission Content
                </label>
                <div className="p-3 bg-gray-50 rounded-md text-sm text-gray-700 max-h-40 overflow-y-auto">
                  {selectedSubmission.text_content}
                </div>
              </div>
            )}
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setSelectedSubmission(null)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={() => handleUpdateProgress(selectedSubmission)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Update Progress
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminSubmissions

