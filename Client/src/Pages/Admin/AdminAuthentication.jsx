import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { adminAuthCredentials } from '../../Service/Admin'
import { useDispatch } from 'react-redux'
import { saveAdminAuthToken } from '../../Features/AuthSlice'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminAuthentication = () => {

    const [inputs, setInputs] = useState({
        userName: '',
        password: ''
    })

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleInputs = (e) => {
        const { name, value } = e.target;
        setInputs({
            ...inputs,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            setLoading(true)
            const response = await axios.post('https://personal-scan-the-menu.onrender.com/api/v1/adminAuth', inputs, {
                headers: {
                    "Content-Type": 'application/json'
                }
            });
            const data = response.data;
            console.log(data.adminAuthToken);
            if (response.status === 200) {

                toast.success('Authenticated As Admin', {
                    autoClose: 1500
                })

                setLoading(false)

                dispatch(saveAdminAuthToken(data.adminAuthToken))
                navigate('/admin')
            }

            console.log(`inputs : ${data}`);
        } catch (error) {
            toast.warning('Not Authorized', {
                autoClose: 2000
            })
        }
    }

    return (
        <main className='main formContainer'>
            <form onSubmit={handleSubmit} className='form'>

                {
                    adminAuthCredentials.map((currElem, index) => {
                        const { type, name, title } = currElem;
                        return (
                            <div className="inputs" key={index}>
                                <label htmlFor={title}>{title}</label>
                                <input type={type} name={name} id={title} value={inputs[name]} onChange={handleInputs} />
                            </div>
                        )
                    })
                }

                <div className="controls">
                    <button type='submit' className='btn' disabled={loading}>{loading ? '...' : 'Submit'}</button>
                </div>
            </form>

        </main>
    )
}

export default AdminAuthentication
