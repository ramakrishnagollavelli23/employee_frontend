import { useParams } from 'react-router-dom'
import { useContext, useState } from 'react'
import ContextStore from '../../context/ContextStore'
import axios from 'axios'
import { toast } from 'react-toastify'

const UpdateEmployee = () => {

    const API = import.meta.env.VITE_BACKEND_URL;
    const { allEmps, navigate, setUpdateStatus } = useContext(ContextStore)
    const { id } = useParams()
    const updateEmployee = !allEmps ? "" : allEmps.find(e => e.empId === Number(id))
    const [updateEmpDetails, setUpdateEmpDetails] = useState({
        empName: updateEmployee.empName,
        empDepartment: updateEmployee.empDepartment,
        empEmail: updateEmployee.empEmail,
        empSalary: updateEmployee.empSalary,
        empGender: updateEmployee.empGender,
        empHeader: updateEmployee.empHeader,
        empNoOfProjectsDone: updateEmployee.empNoOfProjectsDone,
        empOnGoingProject: updateEmployee.empOnGoingProject,
        empPerformance: updateEmployee.empPerformance,
        empDesignation: updateEmployee.empDesignation
    })

    const onChangeEvent = (e) => {
        setUpdateEmpDetails(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const updateDetailsSubmition = async (e) => {
        e.preventDefault()
        await axios.put(`${API}/api/employee/update/${id}`, updateEmpDetails)
            .then(result => {
                if (result.status === 200) {
                    toast.success("Update success...")
                    navigate(`/admin/emp/${id}`)
                    setUpdateStatus(true)
                } else {
                    toast.warn("Check employee details")
                }
            })
            .catch(e => toast.error(e.message))
    }

    return (
        <div className='registeremployee'>
            <div className="registerform">
                <h1>Update Employee</h1>
                <form className="form" onSubmit={(e) => updateDetailsSubmition(e)}>
                    <div className="grid">
                        <div className="input">
                            <label htmlFor="#">Enter Employee Name:</label>
                            <input type="text" placeholder='enter name'
                                name='empName'
                                value={updateEmpDetails.empName}
                                onChange={(e) => onChangeEvent(e)}
                            />
                        </div>
                        <div className="input">
                            <label htmlFor="#">Enter Employee Email:</label>
                            <input type="email" placeholder='enter email'
                                name='empEmail'
                                value={updateEmpDetails.empEmail}
                                onChange={(e) => onChangeEvent(e)} />
                        </div>
                        <div className="input">
                            <label htmlFor="#">Enter Employee Gender:</label>
                            <input type="text" placeholder='male or female'
                                name='empGender'
                                value={updateEmpDetails.empGender}
                                onChange={(e) => onChangeEvent(e)} />
                        </div>
                        <div className="input">
                            <label htmlFor="#">Enter Employee Designation:</label>
                            <input type="text" placeholder='enter designation'
                                name='empDesignation'
                                value={updateEmpDetails.empDesignation}
                                onChange={(e) => onChangeEvent(e)} />
                        </div>
                        <div className="input">
                            <label htmlFor="#">Enter Employee Department:</label>
                            <input type="text" placeholder='enter department'
                                name='empDepartment'
                                value={updateEmpDetails.empDepartment}
                                onChange={(e) => onChangeEvent(e)} />
                        </div>
                        <div className="input">
                            <label htmlFor="#">Enter Employee Salary:</label>
                            <input type="text" placeholder='enter salary'
                                name='empSalary'
                                value={updateEmpDetails.empSalary}
                                onChange={(e) => onChangeEvent(e)} />
                        </div>
                        <div className="input">
                            <label htmlFor="#">Enter Employee No Of Projects done:</label>
                            <input type="text" placeholder='enter no of projects done'
                                name='empNoOfProjectsDone'
                                value={updateEmpDetails.empNoOfProjectsDone}
                                onChange={(e) => onChangeEvent(e)} />
                        </div>
                        <div className="input">
                            <label htmlFor="#">Enter Employee on doing project:</label>
                            <input type="text" placeholder='enter on going project'
                                name='empOnGoingProject'
                                value={updateEmpDetails.empOnGoingProject}
                                onChange={(e) => onChangeEvent(e)} />
                        </div>
                        <div className="input">
                            <label htmlFor="#">Enter Employee head Name:</label>
                            <input type="text" placeholder='enter head name'
                                name='empHeader'
                                value={updateEmpDetails.empHeader}
                                onChange={(e) => onChangeEvent(e)}
                            />
                        </div>
                        <div className="input">
                            <label htmlFor="#">Enter Employee Performance:</label>
                            <input type="text" placeholder='enter performance'
                                name='empPerformance'
                                value={updateEmpDetails.empPerformance}
                                onChange={(e) => onChangeEvent(e)}
                            />
                        </div>
                    </div>
                    <button type='submit'>Update Employee</button>
                </form>
            </div>
        </div>
    )

}

export default UpdateEmployee