import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { ConfigProvider, App } from 'antd'
import Container from './container'
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
        <Container>
          <RouterProvider router={router} />
        </Container>
      </App>
    </ConfigProvider>
  </React.StrictMode>
)
