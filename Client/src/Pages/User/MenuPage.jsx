import React, { Component } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import AutoCarousel from '../../components/User/AutoCarousel';
import { IoCaretForwardSharp } from "react-icons/io5";
import { filteration } from '../../Service/User'

const MenuPage = () => {

  const navigate = useNavigate();
  const dishes = useSelector(state => state.Dish.Dishes);

  const handleShowCategorizedMenu = (filterType, filterValue) => {
    navigate(`category/${filterType}/${filterValue}`)
  }

  // some mens see things as they are and say why?? and others dreams of things that never were and say why not!!

  return (
    <main className='menuContainer'>

      {
        filteration.slice(0, 2).map((currElem, index) => {
          const {title, type, name } = currElem;
          return (
            <section className="sliderContainer" key={index}>
              <div className="sliderHeader">
                <h2>{title}</h2>
                <span className='linkIcons' onClick={() => handleShowCategorizedMenu(type, name)}>Get <IoCaretForwardSharp /></span>
              </div>
              <AutoCarousel dishes={dishes.filter(item => item.type == name)} />
            </section>
          )
        })
      }

      {
        filteration.slice(2,6).map((currElem, index) => {
          const {title, type, name } = currElem;
          return (
            <section className="sliderContainer" key={index}>
              <div className="sliderHeader">
                <h2>{title}</h2>
                <span className='linkIcons' onClick={() => handleShowCategorizedMenu(type, name)}>Get <IoCaretForwardSharp /></span>
              </div>
              <AutoCarousel dishes={dishes.filter(item => item.cusine == name)} />
            </section>
          )
        })
      }
      
    </main>
  )
}

export default MenuPage
