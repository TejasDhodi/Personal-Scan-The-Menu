import React from 'react'
import { NavLink } from 'react-router-dom'
import { IoMdAdd } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { removeAdminAuthToken } from '../../Features/AuthSlice';

const AdminNavbar = () => {

    const dispatch = useDispatch();
    const adminAuthToken = useSelector(state => state.authentication.adminAuth);

    const handleAdminLogout = () => {
        alert('loggedout')
        dispatch(removeAdminAuthToken())
    }

    return (
        <header>
            <nav className="adminNavbar">
                <div className="adminNavBrand">
                    <h2>Admin Panel</h2>
                </div>
                <div className="adminNavItems">
                    {
                        adminAuthToken ?
                            <>
                                <li className='adminNavList'><NavLink to='/admin' className='adminNavLink'>Dashboard</NavLink></li>
                                <li className='adminNavList'><NavLink to='/orders' className='adminNavLink'>Orders</NavLink></li>
                                <li className='adminNavList'><NavLink to='/menuManage' className='adminNavLink'>Menu</NavLink></li>
                                <li className='adminNavList'><NavLink to='/createDish' className="addDishControll"> <IoMdAdd /> </NavLink ></li>
                                <li className='adminNavList' onClick={handleAdminLogout}>Logout</li>
                            </>
                            :
                            <>
                                <li className='adminNavList'><NavLink to='/admin' className='adminNavLink'>Dashboard</NavLink></li>
                                <li className='adminNavList'><NavLink to='/orders' className='adminNavLink'>Orders</NavLink></li>
                                <li className='adminNavList'><NavLink to='/menuManage' className='adminNavLink'>Menu</NavLink></li>
                                <li className='adminNavList'><NavLink to='/createDish' className="addDishControll"> <IoMdAdd /> </NavLink ></li>
                            </>
                    }
                </div>
            </nav>
        </header>
    )
}

export default AdminNavbar
