import NotFoundView from '@/views/404'
import { createBrowserRouter } from 'react-router-dom'

export const router = createBrowserRouter([
  {
    path: '/',
    lazy: () => import('@/views/login.tsx'),
  },
  {
    path: '/activate/re-send-code',
    lazy: () => import('@/views/re-send-code.tsx'),
  },
  {
    path: '/activate/:code',
    lazy: () => import('@/views/activate.tsx'),
  },
  {
    path: '/etkinlestir/tekrar-gonder',
    lazy: () => import('@/views/re-send-code.tsx'),
  },
  {
    path: '/etkinlestir/:code',
    lazy: () => import('@/views/activate.tsx'),
  },
  {
    path: '*',
    element: <NotFoundView />,
  },
])
