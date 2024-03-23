import React from 'react'
import AdminNavbar from '../components/Admin/AdminNavbar'
const AdminLayout = ({ children }) => {
    return (
        <div>
            <AdminNavbar />
            {children}
        </div>
    )
}

export default AdminLayout
