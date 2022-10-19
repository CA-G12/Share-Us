import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { AuthProvider } from './helpers/useAuth'
import './index.css'
import ApiService from './services/ApiService'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
)

ApiService.init()
ApiService.setHeader()

root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
)
