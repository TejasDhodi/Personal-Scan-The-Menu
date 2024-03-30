import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { removeAdminAuthToken } from '../../Features/AuthSlice';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminNavbar = () => {

    const [toggleNav, setToggleNav] = useState(false);

    const dispatch = useDispatch();
    const adminAuthToken = useSelector(state => state.authentication.adminAuth);

    const handleToggleNav = () => setToggleNav(!toggleNav);

    const handleAdminLogout = () => {

        toast.success('loggedout', {
            autoClose: 1500
        })
        
        dispatch(removeAdminAuthToken())
    }

    const navItemsDetails = [
        {
            to: "/admin",
            label: "Dashboard"
        },
        {
            to: "/orders",
            label: "Orders"
        },
        {
            to: "/menuManage",
            label: "Menu"
        },
        {
            to: "/createDish",
            label: 'Add Dish'
        },
    ]

    return (
        <header>
            <nav className="adminNavbar">
                <div className="adminNavBrand">
                    <h2>Admin Panel</h2>
                </div>
                <ul className={toggleNav ? "adminNavItems showToggleNav" : "adminNavItems"}>
                    {
                        adminAuthToken ?
                            <>
                                {
                                    navItemsDetails.map((currElem, index) => {
                                        const { to, label } = currElem;
                                        return (
                                            <li className='adminNavList'><NavLink to={to} className='adminNavLink' onClick={() => setToggleNav(false)}>{label}</NavLink></li>
                                        )
                                    })
                                }
                                <li className='adminNavList' onClick={handleAdminLogout}><NavLink className='adminNavLink'>Logout</NavLink></li>
                            </>
                            :
                            <>
                                {
                                    navItemsDetails.map((currElem, index) => {
                                        const { to, label } = currElem;
                                        return (
                                            <li className='adminNavList'><NavLink to={to} className='adminNavLink'>{label}</NavLink></li>
                                        )
                                    })
                                }
                            </>
                    }
                </ul>

                <div className={toggleNav ? "hamburgerMenu toggle" : "hamburgerMenu"} onClick={handleToggleNav}>
                    <div id="bar1" className="bar"></div>
                    <div id="bar2" className="bar"></div>
                    <div id="bar3" className="bar"></div>
                </div>
            </nav>
        </header>
    )
}

export default AdminNavbar
