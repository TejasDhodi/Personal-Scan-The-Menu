import React, { useEffect, useState } from 'react'
import AllMenuComponent from '../../components/Admin/AllMenuComponent'
import axios from 'axios'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MenuManage = () => {

  const [dishes, setDishes] = useState("");

  // To Get the data of Dishes from Database
  const getDishData = async () => {
    try {
      const response = await axios.get('https://personal-scan-the-menu.onrender.com/api/v1/dishes');

      if (response.status === 200) {
        setDishes(response.data.dishdata);
      }
    } catch (error) {
      console.log('Enable to get dish data', error);
    }
  }

  // To Delete dish from database
  const handleDeleteDish = async (id) => {
    try {
      const response = await axios.delete(`https://personal-scan-the-menu.onrender.com/api/v1/dishes/delete/${id}`);

      if (response.status === 200) {

        toast.success('Dish Deleted Successfully', {
          autoClose: 1500
        })
        
        getDishData();
      }
    } catch (error) {
      console.log('Unable to delete dish');
    }
  }

  useEffect(() => {
    getDishData();
  }, [])

  return (
    <div>
      <AllMenuComponent
        dishes={dishes}
        handleDeleteDish={handleDeleteDish}
      />
    </div>
  )
}

export default MenuManage
