import { useEffect, useState } from 'react'
import ContextStore from './ContextStore'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const ContextApi = (props) => {

    const API = import.meta.env.VITE_BACKEND_URL;
    const [formName, setFormName] = useState("Employee");
    const navigate = useNavigate()
    const [employee, setEmployee] = useState(null)
    const [loginStatus, setLoginStatus] = useState(false)

    const fetchData = async (id) => {
        await axios.get(`${API}/api/employee/get/${id}`)
            .then(result => setEmployee(result.data))
    }

    useEffect(() => {
        const sessionStoreData = JSON.parse(window.sessionStorage.getItem("loginPerson"))
        if (sessionStoreData) {
            setLoginStatus(true)
            fetchData(sessionStoreData.empId)
        }
    }, [loginStatus]);

    const [allEmps, setAllEmps] = useState(null)
    const fetchAllEmpData = async () => {
        await axios.get(`${API}/api/employee/get`)
            .then(result => setAllEmps(result.data))
            .catch(e => toast.error(e.message))
    }

    useEffect(() => {
        if (loginStatus) {
            fetchAllEmpData()
        }
    }, [loginStatus])

    const contextValues = {
        formName,
        setFormName,
        navigate,
        employee,
        setEmployee,
        loginStatus,
        setLoginStatus,
        allEmps,
        setAllEmps,
    }

    return (
        <ContextStore.Provider value={contextValues}>
            {props.children}
        </ContextStore.Provider>
    )
}

export default ContextApi