import React, { useEffect, useState } from 'react'
import AdminRoute from './Routes/AdminRoute'
import UserRoute from './Routes/UserRoute'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { getDish } from './Features/DishesSlice'
import { useLocation } from 'react-router-dom'
import { saveUserProfileDetails } from './Features/AuthSlice'

import 'react-toastify/dist/ReactToastify.css';
import { hideDishLoad, showDishLoad } from './Features/LoadingSlice'

const App = () => {
  // const [url, setUrl] = useState(false);

  const dispatch = useDispatch();
  const location = useLocation();

  const authToken = useSelector(state => state.authentication.data);
  // const authToken = JSON.parse(localStorage.getItem('authToken'));

  const getDishData = async () => {
    try {
      dispatch(showDishLoad(true));
      const response = await axios.get('https://personal-scan-the-menu.onrender.com/api/v1/dishes');
      const data = response.data.dishdata;

      if(response.status === 200) {
        dispatch(getDish(data));
        dispatch(hideDishLoad(false))
      }

    } catch (error) {
      console.log('error while fetching dish Data form database : ', error);
    }
  }

  const getUserProfileInfo = async () => {
    try {
      const response = await axios.get('https://personal-scan-the-menu.onrender.com/api/v1/userProfile', {
        headers: {
          "Content-Type": 'application/json',
          Authorization: `Bearer ${authToken}`
        }
      })

      const data = response.data?.verifiedUser;

      if(response.status === 200) {
        dispatch(saveUserProfileDetails(data))
        console.log('User Details : ', data);
      }
    } catch (error) {
      console.log('Error while fetching user info : ', error);
    }
  }

  useEffect(() => {
    // setUrl(true)
    getDishData();
  }, [location])

  useEffect(() => {
    getUserProfileInfo();
  }, [authToken]);
  return (
    <>
      {/* Admin Routes */}
      <AdminRoute />

      {/* Users Route */}
      <UserRoute />

    </>
  )
}


export default App