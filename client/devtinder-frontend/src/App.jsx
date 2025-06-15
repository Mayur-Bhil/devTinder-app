import { useState } from 'react'
import './index.css'
import Navbar from './Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Body from './BOdy'
import Login from './Login'
import Profile from './Profile'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter basename='/'>
        <Routes>
            <Route path='/' element={<Body/>}>
                 <Route path='/login' element={<Login/>}/>
                 <Route path='/profile' element={<Profile/>}/>
            </Route>
        </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
