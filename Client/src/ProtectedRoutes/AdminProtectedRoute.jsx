import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminProtectedRoute = ({Component}) => {

    const navigate = useNavigate();
    const adminAuthToken = useSelector(state => state.authentication.adminAuth);

    useEffect(() => {
        if(!adminAuthToken) {

            toast.warning('You Are Not Authorized to access this page', {
                autoClose: 1500
            })

            navigate('/adminAuth')
        }
    }, [adminAuthToken])

  return <Component />
}

export default AdminProtectedRoute
