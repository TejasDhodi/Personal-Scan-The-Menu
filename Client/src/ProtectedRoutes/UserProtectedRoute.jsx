import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, Outlet } from 'react-router-dom'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserProtectedRoute = ({ Component }) => {

    const navigate = useNavigate();
    const authToken = useSelector(state => state.authentication.data);

    useEffect(() => {
        if (!authToken) {

            toast.warning('You Are Not Authorized to access this page', {
                autoClose: 1500
            })

            navigate('/signin');
        }
    }, [authToken]);
    
    return <Component />
}

export default UserProtectedRoute
