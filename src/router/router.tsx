import { getCurrentServeLocale } from '@/utils/lang'
import NotFoundView from '@/views/404'
import { RouteObject, createBrowserRouter } from 'react-router-dom'

const trRoutes: RouteObject[] = [
  {
    path: '/etkinlestir/tekrar-gonder',
    lazy: () => import('@/views/re-send-code.tsx'),
  },
  {
    path: '/etkinlestir/:code',
    lazy: () => import('@/views/activate.tsx'),
  },
]

const enRoutes: RouteObject[] = [
  {
    path: '/activate/re-send-code',
    lazy: () => import('@/views/re-send-code.tsx'),
  },
  {
    path: '/activate/:code',
    lazy: () => import('@/views/activate.tsx'),
  },
]

const routes: RouteObject[] = [
  {
    path: '/',
    lazy: () => import('@/views/login.tsx'),
  },
]

const locale = getCurrentServeLocale()

if (locale) {
  if (locale === 'tr') {
    routes.push(...trRoutes)
  } else if (locale === 'en') {
    routes.push(...enRoutes)
  }
} else {
  routes.push(...trRoutes, ...enRoutes)
}

routes.push({
  path: '*',
  element: <NotFoundView />,
})

export const router = createBrowserRouter(routes)
