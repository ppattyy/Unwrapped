import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Login from './Login.jsx'
import ConnectButton from './ConnectButton.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ConnectButton />
  </StrictMode>,
)

