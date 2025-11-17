import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '7.css/dist/7.css'
import '@fortawesome/fontawesome-free/css/all.css'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
