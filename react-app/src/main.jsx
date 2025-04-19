import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Login from './Login.jsx'
import ConnectButton from './ConnectButton.jsx'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ConnectButton />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);

