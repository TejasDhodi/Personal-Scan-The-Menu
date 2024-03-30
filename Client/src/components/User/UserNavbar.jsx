import React, { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import '../../Styles/User/UserComponent.css'
import ProfileLinks from './ProfileLinks';
import { FaChevronDown, FaShoppingCart, FaUser } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const UserNavbar = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [toggleNav, setToggleNav] = useState(false);

  const cartLength = useSelector(state => state.cart.data).length;
  const userName = useSelector(state => state.authentication.userProfile?.fullName);
  const authToken = useSelector(state => state.authentication.data);
  const location = useLocation();

  const handleShowProfile = () => setShowProfile(!showProfile);
  const handleToggleNav = () => setToggleNav(!toggleNav);

  useEffect(() => {
    const path = location.pathname.includes('/admin') || location.pathname.includes('/adminAuth') || location.pathname.includes('/menuManage') || location.pathname.includes('/createDish') || location.pathname.includes('/orders') || location.pathname.includes('/update');
    setIsAdmin(path)
  }, [location.pathname])

  return (
    <>
      <header id='header'>
        <nav className={isAdmin ? "navbar hideNav" : "navbar"}>
          <div className="navBrand">
            <img src="/Images/Nav-Brand.jpeg" alt="" />
          </div>
          <ul className={toggleNav ? "navItems showToggleNav" : "navItems"}>
            <li className="navList"><NavLink to='/' className='navLink' onClick={() => setToggleNav(false)}>Home</NavLink></li>
            <li className="navList"><NavLink to='/menu' className='navLink' onClick={() => setToggleNav(false)}>Menu</NavLink></li>
            <li className="navList"><NavLink to='/contact' className='navLink' onClick={() => setToggleNav(false)}>Contact</NavLink></li>
            <li className="navList"><NavLink to='/tables' className='navLink' onClick={() => setToggleNav(false)}>Tables</NavLink></li>
            <li ><NavLink className='linkIcons' to={'/menu/cart'} onClick={() => setToggleNav(false)} ><FaShoppingCart /> Cart {cartLength}</NavLink></li>
          </ul>

          <div className="profile">
            <h3><NavLink className='linkIcons' onClick={handleShowProfile}><FaUser /> {authToken && userName ? userName : 'Please Login'} <FaChevronDown className={showProfile ? 'down' : ''} /></NavLink></h3>
          </div>

          <div className={toggleNav ? "hamburgerMenu toggle" : "hamburgerMenu"} onClick={handleToggleNav}>
            <div id="bar1" className="bar"></div>
            <div id="bar2" className="bar"></div>
            <div id="bar3" className="bar"></div>
          </div>

        </nav>
        <ProfileLinks showProfile={showProfile} setShowProfile={setShowProfile} />
      </header>
    </>
  )
}

export default UserNavbar
