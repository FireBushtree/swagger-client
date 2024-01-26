import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { ConfigProvider, App } from 'antd'
import router from './router'

// css
import 'normalize.css'

const root = document.getElementById('root')

!!root && ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#6C6FC3'
          }
        }}
    >
      <App>
        <RouterProvider router={router} />
      </App>
    </ConfigProvider>
  </React.StrictMode>
)
