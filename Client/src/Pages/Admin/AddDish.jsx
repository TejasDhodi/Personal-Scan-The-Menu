import React, { useState, useRef } from 'react'
import axios from 'axios'
import DishFormComponent from '../../components/Admin/DishFormComponent';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddDish = () => {
  const [inputs, setInputs] = useState({
    dishName: "",
    dishMacros: "",
    dishPrice: "",
    dishDescription: "",
    dishIngredients: "",
    type: "",
    category: "",
    cusine: ""
  })

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setInputs((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleFile = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)

    try {
      const formData = new FormData();
      formData.append('dishName', inputs.dishName)
      formData.append('dishMacros', inputs.dishMacros)
      formData.append('dishPrice', inputs.dishPrice)
      formData.append('dishDescription', inputs.dishDescription)
      formData.append('dishIngredients', inputs.dishIngredients)
      formData.append('file', file);
      formData.append('type', inputs.type);
      formData.append('category', inputs.category);
      formData.append('cusine', inputs.cusine);

      const response = await axios.post('https://personal-scan-the-menu.onrender.com/api/v1/createDish', formData, {
        headers: {
          "Content-Type": 'multipart/form-data'
        }
      })

      const data = response.data;
      console.log(data.addedDish.dishName);
      if (response.status === 201) {

        toast.success('Dish Added SuccessFully', {
          autoClose: 1500
        })

        setInputs({
          dishName: "",
          dishMacros: "",
          dishPrice: "",
          dishDescription: "",
          dishIngredients: "",
          type: "",
          category: "",
          cusine: ""
        })

        setFile(null)
        setLoading(false)
      }
    } catch (error) {
      toast.error(error.response.data.message, {
        autoClose: 3000
      })
      console.log('error', error);
    }
  }

  const focusDishName = useRef(null)

  return (
    <>
      <main className="addDishContainer">
        <DishFormComponent
          handleSubmit={handleSubmit}
          handleInputs={handleInputs}
          loading={loading}
          handleFile={handleFile}
          inputs={inputs}
          focusDishName={focusDishName}
        />
      </main>
    </>
  )
}

export default AddDish
