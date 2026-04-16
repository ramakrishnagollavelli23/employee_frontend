import './Admin.css'
import search_icon from '../../assests/search_icon.png'
import plus from '../../assests/plus.png'
import { useContext, useEffect, useState } from 'react'
import ContextStore from '../../context/ContextStore'
import delete_icon from '../../assests/delete.png'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const Admin = () => {

  const API = import.meta.env.VITE_BACKEND_URL;
  const { allEmps, navigate } = useContext(ContextStore)
  const [allEmpsDuplicate, setAllEmpsDuplicate] = useState(null)
  const [searchString, setSearchString] = useState('')

  useEffect(() => {
    !allEmps ? setAllEmpsDuplicate(null) : setAllEmpsDuplicate(allEmps)
  }, [allEmps])

  const onChangeEventHandling = (e) => {
    setSearchString(e.target.value)
    if (e.target.value === "") {
      setAllEmpsDuplicate(allEmps)
    }
  }

  const formSubmitionEvent = async (e) => {
    e.preventDefault()
    const emps = await allEmps.filter(item =>
      item.empName.toLowerCase().includes(searchString.toLowerCase()) ||
      item.empEmail.toLowerCase().includes(searchString.toLowerCase()) ||
      item.empDesignation.toLowerCase().includes(searchString.toLowerCase()))
    setAllEmpsDuplicate(emps)
  }

  const deleteEmp = async (id) => {
    if (confirm("Are you sure to delete this employee?")) {
      await axios.delete(`${API}/api/employee/delete/${id}`)
        .then(window.location.reload())
        .catch(e => toast.error(e.message))
    }
  }

  const showForm = () => {
    navigate("/admin/registeremployee")
  }

  return (
    <div className='admin'>
      <h1>Welcome To Admin's Dashboard</h1>
      <div className="bar">
        <form className="search-bar" onSubmit={(e) => formSubmitionEvent(e)}>
          <input type="text" placeholder='Search here...'
            name='searchString'
            value={searchString}
            onChange={e => onChangeEventHandling(e)} />
          <button type="submit"><img src={search_icon} alt="" /></button>
        </form>
        <button className='new-btn' onClick={() => showForm()}><img src={plus} alt="" /> New</button>
      </div>
      {
        !allEmpsDuplicate ?
          <div className="loader" style={{ height: "60vh" }}>
            <div className="load"></div>
          </div>
          :
          <div className="emps-data">
            <div className="emp-indi-data head">
              <p>Id</p>
              <p>Name</p>
              <p>Email</p>
              <p className='hide'>Designation</p>
              <p>Delete Employee</p>
            </div>
            {
              allEmpsDuplicate.map((item, i) => {
                return (
                  <div className="emp-indi-data" key={i}>
                    <Link to={`/admin/emp/${item.empId}`}>
                      <p>{i + 1}</p>
                      <p>{item.empName}</p>
                      <p style={{ textTransform: "lowercase" }}>{item.empEmail}</p>
                      <p className='hide'>{item.empDesignation}</p>
                    </Link>
                    <button onClick={() => deleteEmp(item.empId)}>Delete<img src={delete_icon} alt="" /></button>
                  </div>
                )
              })
            }
          </div>
      }
    </div >
  )
}

export default Admin