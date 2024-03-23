import React, { useState, useRef } from 'react'
import axios from 'axios'
import DishFormComponent from '../../components/Admin/DishFormComponent';

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

      const response = await axios.post('http://localhost:3000/api/v1/createDish', formData, {
        headers: {
          "Content-Type": 'multipart/form-data'
        }
      })

      const data = response.data;
      console.log(data.addedDish.dishName);
      if (response.status === 201) {
        alert("Created")

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
      }
    } catch (error) {
      console.log('error', error);
    }
  }

  const focusDishName = useRef(null)

  return (
    <>
      <main className="addDishContainer">
        {/* <form className='addDishDetails' onSubmit={handleSubmit}>
          <h2>Add Dish</h2>

          <div className="dishTitle">
            <div className="inputs">
              <label htmlFor="dishName">Dish Name</label>
              <input type="text" id='dishName' name='dishName' value={inputs.dishName} onChange={handleInputs} placeholder='Add Dish Title' ref={focusDishName} required />
            </div>
          </div>

          <div className="dishData">

            <div className="inputs">
              <label htmlFor="dishImage">Dish Image</label>
              <input type='file' id='dishImage' onChange={handleFile} required />
            </div>

            {
              inputFields.map((field, index) => {
                const { name, label, type, ref, rows, col } = field;
                return (
                  <div className="inputs" key={index}>
                    <label htmlFor={name} key={index * 2}>{label}</label>
                    {
                      type === 'textarea' ? (
                        <textarea
                          id={name}
                          name={name}
                          value={inputs[name]}
                          onChange={handleInputs}
                          placeholder={`Add ${label}`}
                          rows={rows}
                          cols={col}
                          required
                        />
                      ) : (
                        <input
                          type={type}
                          id={name}
                          name={name}
                          value={inputs[name]}
                          onChange={handleInputs}
                          placeholder={`Add ${label}`}
                          ref={ref}
                          required={type !== 'file'}
                        />
                      )
                    }
                  </div>
                )
              })
            }

            <div className="inputs">
              <label htmlFor="type">Type</label>
              <select name="type" value={inputs.type} onChange={handleInputs} id="type">
                <option value='' disabled>Select Type</option>
                {
                  dishTypes.map((types, index) => {
                    const { name, value } = types;
                    return (
                      <option value={value} key={index * 3}>{name}</option>
                    )
                  })
                }
              </select>
            </div>

            <div className="inputs">
              <label htmlFor="category">Category</label>
              <select name="category" value={inputs.category} onChange={handleInputs} id="category">
                <option value='' disabled>Select Category</option>
                {
                  dishCategories.map((category, index) => {
                    const { names } = category;
                    return (
                      <option value={names} key={index * 4}>{names}</option>
                    )
                  })
                }
              </select>
            </div>
            <div className="inputs">
              <label htmlFor="cusine">Cusine</label>
              <select name="cusine" id="cusine" value={inputs.cusine} onChange={handleInputs}>
                <option value="" disabled>Select Cusine</option>
                {
                  dishCusines.map((cusines, index) => {
                    const { names } = cusines;
                    return (
                      <option value={names} key={index * 5}>{names}</option>
                    )
                  })
                }
              </select>
            </div>

          </div>

          <div className="controls">
            <button type="submit">Add Dish</button>
          </div>

        </form> */}
        <DishFormComponent
          handleSubmit={handleSubmit}
          handleInputs={handleInputs}
          handleFile={handleFile}
          inputs={inputs}
          focusDishName={focusDishName}
        />
      </main>
    </>
  )
}

export default AddDish
