import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Signup from './Signup'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login  from './Login'
import Home from './Home'
import NewGame from './NewGame'
import FirstPage from './FirstPage'
import GameLevels from './GameLevels'
import Profile from './Profile'
import Instructions from './Instructions'
import LeaderBoard from './LeaderBoard'
import DailyCahllenge from './DailyCahllenge'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FirstPage />}/>
        <Route path='/register' element={<Signup notify={toast} />}></Route>
        <Route path='/login' element={<Login notify={toast} />}></Route>
        <Route path='/home' element={<Home/>}></Route>
        <Route path='/newgame' element={<NewGame/>}></Route>
        <Route path='/levels' element={<GameLevels/>}></Route>
        <Route path='/profile' element={<Profile/>}></Route>
        <Route path='/instructions' element={<Instructions/>}></Route>
        <Route path='/leaderboard' element={<LeaderBoard/>}></Route>
        <Route path='/dailychallenge' element={<DailyCahllenge/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
