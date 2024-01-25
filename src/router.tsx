import { createBrowserRouter } from 'react-router-dom'
import Default from './layout/default'
import Home from './pages/home'

const router = createBrowserRouter([
  {
    path: '/',
    Component: Default,
    children: [
      {
        path: '/home',
        Component: Home
      }
    ]
  }
])

export default router
