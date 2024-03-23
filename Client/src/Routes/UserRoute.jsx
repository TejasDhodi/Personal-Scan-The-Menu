import React, { useEffect, useState } from 'react'
import UserLayout from '../Layouts/UserLayout'
import HomePage from '../Pages/User/HomePage'
import Contact from '../Pages/User/Contact'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Register from '../Pages/User/Register'
import Login from '../Pages/User/Login'
import MenuPage from '../Pages/User/MenuPage'
import UserCart from '../Pages/User/UserCart'
import DishDetails from '../Pages/User/DishDetails'
import CategorizedMenu from '../Pages/User/CategorizedMenu'
import PaymentSuccess from '../Pages/User/PaymentSuccess'
import UserProfile from '../Pages/User/UserProfile'
import UserProtectedRoute from '../ProtectedRoutes/UserProtectedRoute'
import TablePage from '../Pages/User/TablePage'

const UserRoute = () => {

  return (
    <UserLayout>
      <Routes>
        <Route path='/' element={<HomePage />} />

        <Route path='/contact' element={<Contact />} />

        <Route path='/profile' element={<UserProtectedRoute Component={UserProfile} />} />

        <Route path='/signup' element={<Register />} />

        <Route path='/signin' element={<Login />} />

        <Route path='/tables' element={<TablePage />} />

        <Route path='/menu'>
          <Route index element={<MenuPage />} />
          <Route path='details/:dishId' element={<DishDetails />} />
          <Route path='category/:filterType/:filterValue' element={<CategorizedMenu />} />
          <Route path='cart' element={<UserProtectedRoute Component={UserCart} />} />
        </Route>

        <Route path='/success' element={<UserProtectedRoute Component={PaymentSuccess} />} />

      </Routes>
    </UserLayout>
  )
}

export default UserRoute
