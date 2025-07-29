import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import Register from './pages/Register.jsx'
import Login from './pages/Login'
import { MantineProvider } from '@mantine/core'
import Dashbored from './pages/Dashbored.jsx'

const App = () => {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/' element={<Login />}></Route>
        <Route path='/dashboard' element={<Dashbored />}></Route>
      </Routes>
    </BrowserRouter>  
    </MantineProvider>
  )
}

export default App
