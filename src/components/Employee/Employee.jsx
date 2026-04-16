import { useContext } from 'react'
import './Employee.css'
import male from '../../assests/male_emp.png'
import female from '../../assests/female_emp.png'
import ContextStore from '../../context/ContextStore'

const Employee = () => {

    const { employee } = useContext(ContextStore)

    if (!employee) {
        return (
            <div className='loader'>
                <div className="load"></div>
            </div>
        )
    } else {
        return (
            <div className='employee'>
                <div className="emp-left">
                    <div className="emp-left-img">
                        <img src={employee.empGender.toLowerCase() === "male" ? male : female} alt="" />
                    </div>
                    <div className="emp-left-content">
                        <div className="emp-data">
                            <label>Employee Id : </label>
                            <p>{employee.empId}</p>
                        </div>
                        <div className="emp-data">
                            <label>Employee Name : </label>
                            <p>{employee.empName}</p>
                        </div>
                    </div>
                </div>
                <div className="emp-right">
                    <div className="emp-data">
                        <label>Email <span>:</span> </label>
                        <p style={{ textTransform: "lowercase" }}>{employee.empEmail}</p>
                    </div>
                    <div className="emp-data">
                        <label>Gender <span>:</span> </label>
                        <p>{employee.empGender}</p>
                    </div>
                    <div className="emp-data">
                        <label>Department <span>:</span> </label>
                        <p>{employee.empDepartment}</p>
                    </div>
                    <div className="emp-data">
                        <label>Designation <span>:</span> </label>
                        <p>{employee.empDesignation}</p>
                    </div>
                    <div className="emp-data">
                        <label>Role <span>:</span> </label>
                        <p>{employee.empRole}</p>
                    </div>
                    <div className="emp-data">
                        <label>Salary <span>:</span> </label>
                        <p>{employee.empSalary}.00</p>
                    </div>
                    <div className="emp-data">
                        <label>Joining Date <span>:</span> </label>
                        <p>{employee.empJoinDate}</p>
                    </div>
                    <div className="emp-data">
                        <label>Head <span>:</span> </label>
                        <p>{employee.empHeader}</p>
                    </div>
                    <div className="emp-data">
                        <label>No Of Projects Done <span>:</span> </label>
                        <p>{employee.empNoOfProjectsDone}</p>
                    </div>
                    <div className="emp-data">
                        <label>On Going Project <span>:</span> </label>
                        <p>{employee.empOnGoingProject}</p>
                    </div>
                    <div className="emp-data">
                        <label>Performance <span>:</span> </label>
                        <p>{employee.empPerformance}/10</p>
                    </div>
                </div>
            </div>
        )
    }


}

export default Employee