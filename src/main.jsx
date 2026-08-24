import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App.jsx'
import { I18nProvider } from './context/I18nContext.jsx'
import './styles/global.css'

// 使用 HashRouter：静态托管（GitHub Pages）下无需服务端重写即可支持刷新 / 直达子路由
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <I18nProvider>
        <App />
      </I18nProvider>
    </HashRouter>
  </React.StrictMode>
)
