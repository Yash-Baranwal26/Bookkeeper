import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import BookAdd from './Component/BookAdd.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
  <Routes>
    <Route path='/' element={<App/>}/>
    <Route path='/bookAdd' element={<BookAdd/>}/>

  </Routes>
  </BrowserRouter>
  </StrictMode>,
)
