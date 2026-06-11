import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import { ToastContainer } from "react-toastify"
import Login from './pages/Login/login'
function App() {

  return (
    <>
      <ToastContainer position='top-right' autoClose={3000} />
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login/>} />
          <Route path='/' />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
