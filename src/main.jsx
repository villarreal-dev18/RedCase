import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ConfigProvider } from 'antd'
import { antdTheme } from './theme/antdtheme.js'
import { applyCssVars } from './theme/applyCssVars.js'

applyCssVars();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ConfigProvider theme={antdTheme}>
      <App />
    </ConfigProvider>
  </StrictMode>,
)
