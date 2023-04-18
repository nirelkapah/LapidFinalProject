import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/layout/layout'
import './index.css'
import Layout from './components/layout/layout'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Layout />
  </React.StrictMode>,
)