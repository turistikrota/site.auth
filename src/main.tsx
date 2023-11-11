import '@turistikrota/ui/assets/config.css'
import '@turistikrota/ui/fonts/verdana.css'
import ContentLoader from '@turistikrota/ui/loader'
import 'boxicons/css/boxicons.min.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import 'sspin/dist/index.css'
import { ErrorBoundary } from './components/ErrorBoundary'
import ServerError from './components/ServerError'
import './config/i18n'
import './index.css'
import { router } from './router/router'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary fallback={<ServerError />}>
      <RouterProvider router={router} fallbackElement={<ContentLoader noMargin />} />
    </ErrorBoundary>
  </React.StrictMode>,
)
