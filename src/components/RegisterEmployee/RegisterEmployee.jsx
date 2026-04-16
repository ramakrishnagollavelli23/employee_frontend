import { useContext, useState } from 'react'
import './RegisterEmployee.css'
import axios from 'axios'
import { toast } from 'react-toastify'
import ContextStore from '../../context/ContextStore'

const RegisterEmployee = () => {

    const API = import.meta.env.REACT_APP_BACKEND_URL;
    const { navigate } = useContext(ContextStore)

    const [registerDetails, setRegisterDetails] = useState({
        empName: "",
        empDepartment: "",
        empEmail: "",
        empSalary: undefined,
        empGender: "",
        empHeader: "",
        empNoOfProjectsDone: undefined,
        empOnGoingProject: "",
        empPerformance: undefined,
        empDesignation: "",
        empPassword: ""
    })

    const onChangeEvent = (e) => {
        setRegisterDetails(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const registerDetailsSubmition = async (e) => {
        e.preventDefault()
        await axios.post(`${API}/api/admin/employee/add`, registerDetails)
            .then(result => {
                if (result.data.code === 1) {
                    toast.warn(result.data.message)
                }
                else if (result.data.code === 0) {
                    navigate("/admin")
                    window.location.reload()
                    toast.success(result.data.message)
                }
            }
            )
            .catch(e => {
                if (e.status === 500) {
                    toast.warn("Check employee details")
                } else {
                    toast.error(e.message)
                }
            })
    }

    return (
        <div className='registeremployee'>
            <div className="registerform">
                <h1>Add Employee</h1>
                <form className="form" onSubmit={(e) => registerDetailsSubmition(e)}>
                    <div className="grid">
                        <div className="input">
                            <label htmlFor="#">Enter Employee Name:</label>
                            <input type="text" placeholder='enter name'
                                name='empName'
                                value={registerDetails.empName}
                                onChange={(e) => onChangeEvent(e)}
                            />
                        </div>
                        <div className="input">
                            <label htmlFor="#">Enter Employee Email:</label>
                            <input type="email" placeholder='enter email'
                                name='empEmail'
                                value={registerDetails.empEmail}
                                onChange={(e) => onChangeEvent(e)} />
                        </div>
                        <div className="input">
                            <label htmlFor="#">Enter Employee Password:</label>
                            <input type="password" placeholder='enter password min 8 characters'
                                name='empPassword'
                                value={registerDetails.empPassword}
                                onChange={(e) => onChangeEvent(e)} />
                        </div>
                        <div className="input">
                            <label htmlFor="#">Enter Employee Gender:</label>
                            <input type="text" placeholder='male or female'
                                name='empGender'
                                value={registerDetails.empGender}
                                onChange={(e) => onChangeEvent(e)} />
                        </div>
                        <div className="input">
                            <label htmlFor="#">Enter Employee Designation:</label>
                            <input type="text" placeholder='enter designation'
                                name='empDesignation'
                                value={registerDetails.empDesignation}
                                onChange={(e) => onChangeEvent(e)} />
                        </div>
                        <div className="input">
                            <label htmlFor="#">Enter Employee Department:</label>
                            <input type="text" placeholder='enter department'
                                name='empDepartment'
                                value={registerDetails.empDepartment}
                                onChange={(e) => onChangeEvent(e)} />
                        </div>
                        <div className="input">
                            <label htmlFor="#">Enter Employee Salary:</label>
                            <input type="text" placeholder='enter salary'
                                name='empSalary'
                                value={registerDetails.empSalary}
                                onChange={(e) => onChangeEvent(e)} />
                        </div>
                        <div className="input">
                            <label htmlFor="#">Enter Employee No Of Projects done:</label>
                            <input type="text" placeholder='enter no of projects done'
                                name='empNoOfProjectsDone'
                                value={registerDetails.empNoOfProjectsDone}
                                onChange={(e) => onChangeEvent(e)} />
                        </div>
                        <div className="input">
                            <label htmlFor="#">Enter Employee on doing project:</label>
                            <input type="text" placeholder='enter on going project'
                                name='empOnGoingProject'
                                value={registerDetails.empOnGoingProject}
                                onChange={(e) => onChangeEvent(e)} />
                        </div>
                        <div className="input">
                            <label htmlFor="#">Enter Employee head Name:</label>
                            <input type="text" placeholder='enter head name'
                                name='empHeader'
                                value={registerDetails.empHeader}
                                onChange={(e) => onChangeEvent(e)}
                            />
                        </div>
                        <div className="input">
                            <label htmlFor="#">Enter Employee Performance:</label>
                            <input type="text" placeholder='enter performance'
                                name='empPerformance'
                                value={registerDetails.empPerformance}
                                onChange={(e) => onChangeEvent(e)}
                            />
                        </div>
                    </div>
                    <button type='submit'> Add Employee</button>
                </form>
            </div>
        </div>
    )
}

export default RegisterEmployee