import ReactDOM from 'react-dom/client'
import { ToastContainer } from 'react-toastify'
import App from './App'
import { AuthProvider } from './hooks/useAuth'
import { FollowingProvider } from './hooks/useFollowing'
import { StartChatProvider } from './context/startChat'
import './index.css'
import ApiService from './services/ApiService'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
)

ApiService.init()
ApiService.setHeader()

root.render(

  <AuthProvider>
    <FollowingProvider>
      <StartChatProvider>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <App />
      </StartChatProvider>
    </FollowingProvider>
  </AuthProvider>,

)
