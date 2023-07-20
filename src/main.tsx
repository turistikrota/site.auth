import '@turistikrota/ui/assets/config.css'
import ContentLoader from '@turistikrota/ui/loader'
import 'boxicons/css/boxicons.min.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { ErrorBoundary, FallbackProps } from 'react-error-boundary'
import { RouterProvider } from 'react-router-dom'
import 'sspin/dist/index.css'
import ServerError from './components/ServerError'
import './config/i18n'
import './index.css'
import { router } from './router/router'

function isMessage(error: unknown): error is { message: string } {
  return !!error && typeof error === 'object' && 'message' in error
}

function fallbackRender({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <ServerError
      onClick={() => {
        if (isMessage(error)) {
          console.log(error.message)
        }
        resetErrorBoundary()
      }}
    />
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary fallbackRender={fallbackRender}>
      <RouterProvider router={router} fallbackElement={<ContentLoader />} />
    </ErrorBoundary>
  </React.StrictMode>,
)
