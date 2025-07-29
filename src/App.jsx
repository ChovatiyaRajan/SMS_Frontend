import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import Register from './Components/Register'
import Login from './Components/Login'
import { MantineProvider } from '@mantine/core'
import Dashbored from './Components/Dashbored'

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
