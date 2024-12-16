import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'regenerator-runtime/runtime';
import App from './App.jsx'
import { ProductContextProvider } from './context/ProductContext.jsx'

createRoot(document.getElementById('root')).render(
  <ProductContextProvider>
    <App />
  </ProductContextProvider>
    
)
