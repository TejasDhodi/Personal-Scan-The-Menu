import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, Outlet } from 'react-router-dom'

const UserProtectedRoute = ({ Component }) => {

    const navigate = useNavigate();
    const authToken = useSelector(state => state.authentication.data);

    useEffect(() => {
        if (!authToken) {
            navigate('/signin');
        }
    }, [authToken]);
    
    return <Component />
}

export default UserProtectedRoute
