import Navbar from './components/Navbar/Navbar'
import Header from './components/Header/Header'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './components/Login/Login'
import { ToastContainer } from 'react-toastify'
import Employee from './components/Employee/Employee'
import Admin from './components/Admin/Admin'
import AdminHandleEmp from './components/AdminHandleEmp/AdminHandleEmp'
import RegisterEmployee from './components/RegisterEmployee/RegisterEmployee'
import UpdateEmployee from './components/UpdateEmployee/UpdateEmployee'

const App = () => {
  return (
    <div>
      <Navbar />
      <ToastContainer className={"toast-container"} />
      <Routes>
        <Route path='/' element={<Header />} />
        <Route path='/login' element={<Login />} />
        <Route path='/employee' element={<Employee />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/admin/registeremployee' element={<RegisterEmployee />} />
        <Route path='/admin/updateemployee/:id' element={<UpdateEmployee />} />
        <Route path='/admin/emp/:id' element={<AdminHandleEmp />} />
      </Routes>
    </div>
  )
}

export default App