import '@turistikrota/ui/assets/config.css'
import ContentLoader from '@turistikrota/ui/loader'
import 'boxicons/css/boxicons.min.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './config/i18n'
import './index.css'
import { router } from './router/router'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} fallbackElement={<ContentLoader />} />
  </React.StrictMode>,
)
