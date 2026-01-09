export interface User {
  id: number
  email: string
  username: string
  full_name: string | null
  role: 'student' | 'admin'
  is_active: boolean
  created_at: string
}

export interface Task {
  id: number
  title: string
  description: string | null
  instructions: string | null
  deadline: string | null
  max_progress: number
  created_at: string
  updated_at: string | null
  created_by: number | null
}

export interface Submission {
  id: number
  user_id: number
  task_id: number
  file_path: string | null
  file_name: string | null
  text_content: string | null
  submitted_at: string
}

export interface Progress {
  id: number
  user_id: number
  task_id: number
  progress_value: number
  updated_at: string
}

export interface Resource {
  id: number
  title: string
  url: string
  description: string | null
  category: 'dictionary' | 'grammar' | 'exchange' | 'other'
  created_at: string
  updated_at: string | null
}

export interface OverallProgress {
  overall_progress: number
  total_tasks: number
  completed_tasks: number
}

export interface LoginCredentials {
  username: string
  password: string
}

export interface RegisterData {
  email: string
  username: string
  password: string
  full_name?: string
}

