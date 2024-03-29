import React from 'react'
import AdminHomePage from '../Pages/Admin/AdminHomePage'
import MenuManage from '../Pages/Admin/MenuManage'
import AddDish from '../Pages/Admin/AddDish'
import AdminAuthentication from '../Pages/Admin/AdminAuthentication'
import AdminLayout from '../Layouts/AdminLayout'
import { Route, Routes } from 'react-router-dom'
import Orders from '../Pages/Admin/Orders'
import UpdateDish from '../Pages/Admin/UpdateDish'
import AdminProtectedRoute from '../ProtectedRoutes/AdminProtectedRoute'

const AdminRoute = () => {
    return (

        <AdminLayout>
            <Routes>
                <Route path='/adminAuth' element={<AdminAuthentication />} />
                <Route path='/admin' element={<AdminProtectedRoute Component={AdminHomePage } />} />
                <Route path='/menuManage' element={<AdminProtectedRoute Component={MenuManage } />} />
                <Route path='/createDish' element={<AdminProtectedRoute Component={AddDish } />} />
                <Route path='/orders' element={<AdminProtectedRoute Component={Orders } />} />
                <Route path='/update/:id' element={<AdminProtectedRoute Component={UpdateDish} />} />
            </Routes>
        </AdminLayout>

    )
}

export default AdminRoute
