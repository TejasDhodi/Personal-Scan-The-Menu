import React from 'react'
import './AdminComponent.css'
import { NavLink } from 'react-router-dom'
import { IoMdAdd } from "react-icons/io";

const AdminNavbar = () => {
    return (
        <div>
            <nav className="adminNavbar">
                <div className="adminNavBrand">
                    <h2>Admin Panel</h2>
                </div>
                <div className="adminNavItems">
                    <li className='adminNavList'><NavLink to='/admin' className='adminNavLink'>Dashboard</NavLink></li>
                    <li className='adminNavList'><NavLink to='/orders' className='adminNavLink'>Orders</NavLink></li>
                    <li className='adminNavList'><NavLink to='/menuManage' className='adminNavLink'>Menu</NavLink></li>
                    <li className='adminNavList'><NavLink to='/createDish' className="addDishControll"> <IoMdAdd /> </NavLink ></li>
                </div>
            </nav>
        </div>
    )
}

export default AdminNavbar
