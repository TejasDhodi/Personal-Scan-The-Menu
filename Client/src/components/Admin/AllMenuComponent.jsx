import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'

const AllMenuComponent = ({dishes, handleDeleteDish}) => {

  const navigate = useNavigate();

  const navigateToUpdate = (id) => {
    navigate(`/update/${id}`)
  }

  return (
    <>
    <section className='menuManage'>
      <div className="menuDataContainer">
        {
          dishes && dishes.map((currElem, index) => {
            const {dishName, dishPrice, file, _id, dishMacros, dishDescription, dishIngredients, type, category} = currElem;
            return (
              <ul className='menuItems' key={index}>
                <li className="menuList"><img src={file} alt={dishName} /></li>
                <li className="menuList">{dishName}</li>
                <li className="menuList">{dishPrice}</li>
                <li className="menuList" onClick={() => navigateToUpdate(_id)}>Edit</li>
                <li className="menuList" onClick={() => handleDeleteDish(_id)}>Delete</li>
              </ul>
            )
          })
        }
      </div>
    </section>
    </>
  )
}

export default AllMenuComponent
