import './Header.css'
import bg_img from '../../assests/header-bg.jpg'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import ContextStore from '../../context/ContextStore'

const Header = () => {

  const { setFormName } = useContext(ContextStore)

  return (
    <div className='header'>
      <img src={bg_img} alt="" />
      <div className="header-content">
        <h1>Welcome to the <br />Employee Management System</h1>
        <p>To create a centralized system that manages all employee-related information and HR activities.
          The application aims to automate routine HR tasks such as employee record keeping, updating,
          and reporting to improve efficiency, reduce errors, and ensure data consistency.</p>
        <div className="btns">
          <Link to={"/login"}>
            <button onClick={() => setFormName("Employee")}>
              Employee
            </button>
          </Link>
          <Link to={"/login"}>
            <button onClick={() => setFormName("Admin") }>
              Admin
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Header