import { useContext, useState } from 'react'
import './Login.css'
import ContextStore from '../../context/ContextStore'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {

  const API = import.meta.env.VITE_BACKEND_URL;
  const { formName, navigate, setLoginStatus } = useContext(ContextStore)
  const [formState, setFormState] = useState("Login")
  const [loginCrediancials, setLoginCrediancials] = useState({
    empEmail: "",
    empPassword: ""
  })
  const [registerUser, setRegisterUser] = useState({
    userName: "",
    password: "",
    email: ""
  })

  const onChangeEventHandler = (e) => {
    formState == "Login" ?
      setLoginCrediancials(prev => ({ ...prev, [e.target.name]: e.target.value })) :
      setRegisterUser(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const onSubmitLoginCredincials = async e => {
    e.preventDefault()
    await axios.post(`${API}/api/login/verify`, loginCrediancials)
      .then(result => {
        if (result.data.empId == 0 && result.data.empRole == null)
          toast.warn("Invalid Crediancials...")
        else {
          window.sessionStorage.setItem("loginPerson", JSON.stringify(result.data))
          setLoginStatus(true)
          toast.success("Login Success...")
          if (result.data.empRole === "Employee")
            navigate("/employee")
          else
            navigate("/admin")
        }
      })
      .catch(e => toast.error(e.message))
  }

  const onSubmitRegisterUser = async e => {
    e.preventDefault()
    await axios.post(`${API}/api/admin/add`, registerUser)
      .then(result => {
        if (result.data.code === 0) {
          toast.success(result.data.message)
          setFormState("Login")
          setRegisterUser({
            userName: "",
            password: "",
            email: ""
          })
        } else if (result.data.code === 1) {
          toast.warn(result.data.message)
        }
      })
      .catch(e => {
        if (e.status === 500) {
          toast.warn("Password must be 8 or more charaters...")
        } else {
          toast.error(e.message)
        }
      })
  }

  return (
    <div className='login-container'>
      <div className="login-form">
        <h2>{formName} {formState}</h2>
        <form className='form' onSubmit={formState == "Login" ? e => onSubmitLoginCredincials(e) : e => onSubmitRegisterUser(e)}>

          {
            formState == "Register" && formName == "Admin" ?
              <input type="text" placeholder='Username...'
                name={"userName"}
                value={registerUser.userName}
                onChange={(e) => onChangeEventHandler(e)} required /> : <></>
          }

          <input type="email" placeholder='Email...'
            name={formState == "Login" ? "empEmail" : "email"}
            value={formState == "Login" ? loginCrediancials.empEmail : registerUser.email}
            onChange={(e) => onChangeEventHandler(e)} required />

          <input type="password" placeholder='Password...'
            name={formState == "Login" ? "empPassword" : "password"}
            value={formState == "Login" ? loginCrediancials.empPassword : registerUser.password}
            onChange={(e) => onChangeEventHandler(e)} required />

          <button type="submit">
            {
              formState == "Register" && formName == "Admin" ?
                "Register" : "Login"
            }
          </button>
          {
            formName == "Admin" ?
              formState == "Login" ? <p>Don't have an account?<span onClick={() => setFormState("Register")}> Register here</span></p> :
                <p>Already have an account?<span onClick={() => setFormState("Login")}> Login now</span></p> : <></>
          }
        </form>
      </div>
    </div>
  )
}

export default Login