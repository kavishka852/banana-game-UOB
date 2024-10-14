import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Signup from './Signup'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login  from './Login'
import Home from './Home'
import NewGame from './NewGame'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GameLevels from './GameLevels'

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path='/register' element={<Signup notify={toast} />}></Route>
        <Route path='/login' element={<Login notify={toast} />}></Route>
        <Route path='/home' element={<Home/>}></Route>
        <Route path='/newgame' element={<NewGame/>}></Route>
        <Route path='/levels' element={<GameLevels/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
