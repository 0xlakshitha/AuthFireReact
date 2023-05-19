import { useState } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'


function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Register/> }/>
        <Route exact path='/login' element={<Login/>} />
      </Routes>
    </Router>
  )
}

export default App
