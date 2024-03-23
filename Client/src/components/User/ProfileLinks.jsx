import React from 'react'
import { FaHeart, FaShoppingCart, FaUser } from "react-icons/fa";
import { MdOutlineLogout } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { removeAuthToken } from '../../Features/AuthSlice';

const ProfileLinks = ({ showProfile, setShowProfile }) => {
  const authToken = useSelector(state => state.authentication.data);
  const dispatch = useDispatch();

  const handleLogout = () => {
    setShowProfile(false)
    dispatch(removeAuthToken())
    localStorage.removeItem('authToken')
  }

  return (
    <div className={showProfile ? "profileLinks showprofile" : "profileLinks"}>
      {
        authToken !== null ? <>
          <NavLink className='linkIcons' to='/profile' onClick={() => setShowProfile(false)}><FaUser /> My Profile</NavLink>
          <NavLink className='linkIcons' onClick={handleLogout}><MdOutlineLogout /> Logout</NavLink>
        </> : <>
          <NavLink className='btn' to='/signin' onClick={() => setShowProfile(false)}>Sign In</NavLink>
          <NavLink className='btn' to='/signup' onClick={() => setShowProfile(false)}>Sign Up</NavLink>
        </>
      }


    </div>
  )
}

export default ProfileLinks
