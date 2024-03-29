import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'

const AdminProtectedRoute = ({Component}) => {

    const navigate = useNavigate();
    const adminAuthToken = useSelector(state => state.authentication.adminAuth);

    useEffect(() => {
        if(!adminAuthToken) {
            alert('You Are Not Authorized to access this')
            navigate('/adminAuth')
        }
    }, [adminAuthToken])

  return <Component />
}

export default AdminProtectedRoute
