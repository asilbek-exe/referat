import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { tasksAPI, submissionsAPI, progressAPI } from '../api/client'
import type { Task, Submission, Progress } from '../types'
import { Calendar, FileText, Upload, ArrowLeft } from 'lucide-react'

const TaskDetail = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [task, setTask] = useState<Task | null>(null)
  const [submission, setSubmission] = useState<Submission | null>(null)
  const [progress, setProgress] = useState<Progress | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [textContent, setTextContent] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    if (id) {
      loadTaskData()
    }
  }, [id])

  const loadTaskData = async () => {
    try {
      const taskId = parseInt(id!)
      const [taskData, submissions, progressData] = await Promise.all([
        tasksAPI.getById(taskId),
        submissionsAPI.getMySubmissions(),
        progressAPI.getMyProgress(),
      ])
      setTask(taskData)
      setSubmission(submissions.find((s) => s.task_id === taskId) || null)
      setProgress(progressData.find((p) => p.task_id === taskId) || null)
    } catch (error) {
      console.error('Failed to load task data:', error)
      setError('Failed to load task details')
    } finally {
      setLoading(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!task || !id) return

    setError('')
    setSuccess('')
    setSubmitting(true)

    try {
      await submissionsAPI.submit(parseInt(id), file, textContent || null)
      setSuccess('Task submitted successfully!')
      setFile(null)
      setTextContent('')
      // Reload data
      await loadTaskData()
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to submit task')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  if (!task) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Task not found</p>
        <button
          onClick={() => navigate('/dashboard')}
          className="mt-4 text-blue-600 hover:text-blue-800"
        >
          Back to Dashboard
        </button>
      </div>
    )
  }

  const progressValue = progress?.progress_value || 0
  const progressPercentage = (progressValue / task.max_progress) * 100
  const isDeadlinePassed = task.deadline && new Date(task.deadline) < new Date()

  return (
    <div className="px-4 py-6 sm:px-0">
      <button
        onClick={() => navigate('/dashboard')}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Dashboard
      </button>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{task.title}</h1>
        
        {task.description && (
          <p className="text-gray-700 mb-4">{task.description}</p>
        )}

        {task.instructions && (
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Instructions</h2>
            <p className="text-gray-700 whitespace-pre-wrap">{task.instructions}</p>
          </div>
        )}

        <div className="flex items-center text-gray-600 mb-4">
          <Calendar className="h-5 w-5 mr-2" />
          <span>
            Deadline: {task.deadline ? new Date(task.deadline).toLocaleString() : 'No deadline'}
          </span>
          {isDeadlinePassed && (
            <span className="ml-2 text-red-600 font-semibold">(Passed)</span>
          )}
        </div>

        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Your Progress</span>
            <span>{progressValue}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-blue-600 h-4 rounded-full transition-all"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {submission && (
          <div className="bg-green-50 border border-green-200 rounded p-4 mb-4">
            <div className="flex items-center">
              <FileText className="h-5 w-5 text-green-600 mr-2" />
              <div>
                <p className="text-green-800 font-semibold">Task Submitted</p>
                <p className="text-green-600 text-sm">
                  Submitted on {new Date(submission.submitted_at).toLocaleString()}
                </p>
                {submission.file_name && (
                  <p className="text-green-600 text-sm">File: {submission.file_name}</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <Upload className="h-5 w-5 mr-2" />
          Submit Your Work
        </h2>

        {error && (
          <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-2">
              Upload File (PDF, etc.)
            </label>
            <input
              id="file"
              type="file"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {file && (
              <p className="mt-2 text-sm text-gray-600">Selected: {file.name}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="textContent" className="block text-sm font-medium text-gray-700 mb-2">
              Or Enter Text Content
            </label>
            <textarea
              id="textContent"
              rows={6}
              value={textContent}
              onChange={(e) => setTextContent(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your submission text here..."
            />
          </div>

          <button
            type="submit"
            disabled={submitting || (!file && !textContent) || isDeadlinePassed}
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? 'Submitting...' : 'Submit Task'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default TaskDetail

