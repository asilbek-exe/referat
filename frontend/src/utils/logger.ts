// Simple logger for debugging
export const logger = {
  log: (...args: any[]) => {
    if (import.meta.env.DEV) {
      console.log('[App]', ...args)
    }
  },
  error: (...args: any[]) => {
    console.error('[App Error]', ...args)
  },
}

