import React from 'react'
import AdminHomePage from '../Pages/Admin/AdminHomePage'
import MenuManage from '../Pages/Admin/MenuManage'
import AddDish from '../Pages/Admin/AddDish'
import AdminAuthentication from '../Pages/Admin/AdminAuthentication'
import AdminLayout from '../Layouts/AdminLayout'
import { Route, Routes } from 'react-router-dom'
import Orders from '../Pages/Admin/Orders'
import UpdateDish from '../Pages/Admin/UpdateDish'

const AdminRoute = () => {
    return (

        <AdminLayout>
            <Routes>
                <Route path='/adminAuth' element={<AdminAuthentication />} />
                <Route path='/admin' element={<AdminHomePage />} />
                <Route path='/menuManage' element={<MenuManage />} />
                <Route path='/createDish' element={<AddDish />} />
                <Route path='/orders' element={<Orders />} />
                <Route path='/update/:id' element={<UpdateDish />} />
            </Routes>
        </AdminLayout>

    )
}

export default AdminRoute
