import { useContext } from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import ContextStore from '../../context/ContextStore'
import logout from '../../assests/logout.png'

const Navbar = () => {

  const { loginStatus, setLoginStatus, navigate } = useContext(ContextStore)

  const handleLogout = () => {
    setLoginStatus(false)
    window.sessionStorage.clear()
    navigate("/")
  }

  const refreshHandleHome = () => {
    !loginStatus ? navigate('/') :
      JSON.parse(sessionStorage.getItem("loginPerson")).empRole === "Employee" ? navigate("/employee") : navigate("/admin")
  }

  return (
    <div className='navbar'>
      <div className="navbar-left">
        <h1 onClick={() => refreshHandleHome()}>Employee Management</h1>
      </div>
      <div className="navbar-right">
        {
          loginStatus ?
            <div className='btn'>
              <div onClick={() => handleLogout()} className={"logout"}>Logout <img src={logout} alt="" /></div>
            </div>
            : <></>
        }
      </div>
    </div>
  )
}

export default Navbar