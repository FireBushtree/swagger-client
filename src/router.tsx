import { createBrowserRouter } from 'react-router-dom'
import Default from './layout/default'
import Home from './pages/home'
import Document from './pages/document'

const router = createBrowserRouter([
  {
    path: '/',
    Component: Default,
    children: [
      {
        path: '/home',
        Component: Home
      },
      {
        path: '/doc/:id',
        Component: Document
      }
    ]
  }
])

export default router
