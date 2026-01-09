import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import ErrorBoundary from './components/ErrorBoundary'
import './index.css'

// Debug info
console.log('App starting...')
console.log('Base URL:', import.meta.env.BASE_URL)
console.log('Mode:', import.meta.env.MODE)
console.log('Use Hash Router:', import.meta.env.VITE_USE_HASH_ROUTER)

const rootElement = document.getElementById('root')
if (!rootElement) {
  throw new Error('Root element not found')
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
)

