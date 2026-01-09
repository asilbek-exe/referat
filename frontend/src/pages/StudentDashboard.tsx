import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { tasksAPI, progressAPI } from '../api/client'
import type { Task, Progress, OverallProgress } from '../types'
import { BookOpen, Calendar, TrendingUp } from 'lucide-react'

const StudentDashboard = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [progress, setProgress] = useState<Progress[]>([])
  const [overallProgress, setOverallProgress] = useState<OverallProgress | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [tasksData, progressData, overallData] = await Promise.all([
        tasksAPI.getAll(),
        progressAPI.getMyProgress(),
        progressAPI.getOverallProgress(),
      ])
      setTasks(tasksData || [])
      setProgress(progressData || [])
      // Ensure overallData has the expected structure
      if (overallData && typeof overallData === 'object' && 'overall_progress' in overallData) {
        setOverallProgress(overallData)
      } else {
        // Set default if API returns unexpected format
        setOverallProgress({
          overall_progress: 0,
          total_tasks: tasksData?.length || 0,
          completed_tasks: 0
        })
      }
    } catch (error) {
      console.error('Failed to load data:', error)
      // Set defaults on error
      setOverallProgress({
        overall_progress: 0,
        total_tasks: 0,
        completed_tasks: 0
      })
    } finally {
      setLoading(false)
    }
  }

  const getTaskProgress = (taskId: number): number => {
    const progressRecord = progress.find((p) => p.task_id === taskId)
    return progressRecord?.progress_value || 0
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'No deadline'
    return new Date(dateString).toLocaleDateString()
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
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        {overallProgress && typeof overallProgress.overall_progress === 'number' && (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-4">
              <TrendingUp className="h-6 w-6 text-blue-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">Overall Progress</h2>
            </div>
            <div className="mb-2">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Progress</span>
                <span>{overallProgress.overall_progress.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="bg-blue-600 h-4 rounded-full transition-all"
                  style={{ width: `${Math.min(100, Math.max(0, overallProgress.overall_progress))}%` }}
                />
              </div>
            </div>
            <p className="text-sm text-gray-600">
              Completed {overallProgress.completed_tasks || 0} of {overallProgress.total_tasks || 0} tasks
            </p>
          </div>
        )}
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Project-Based Tasks</h2>
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {Array.isArray(tasks) && tasks.length > 0 ? tasks.map((task) => {
            const taskProgress = getTaskProgress(task.id)
            const progressPercentage = (taskProgress / task.max_progress) * 100

            return (
              <div
                key={task.id}
                className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <BookOpen className="h-6 w-6 text-blue-600 flex-shrink-0" />
                  <Link
                    to={`/tasks/${task.id}`}
                    className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                  >
                    View Details →
                  </Link>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{task.title}</h3>
                {task.description && (
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{task.description}</p>
                )}
                <div className="mb-4">
                  <div className="flex items-center text-sm text-gray-600 mb-1">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{formatDate(task.deadline)}</span>
                  </div>
                  <div className="mt-2">
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>Progress</span>
                      <span>{taskProgress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{ width: `${progressPercentage}%` }}
                      />
                    </div>
                  </div>
                </div>
                <Link
                  to={`/tasks/${task.id}`}
                  className="block w-full text-center py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Start Task
                </Link>
              </div>
            )
          }) : null}
        </div>
        {(!Array.isArray(tasks) || tasks.length === 0) && (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-500">No tasks available yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default StudentDashboard

