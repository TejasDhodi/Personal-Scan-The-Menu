import React from 'react'
import { useDispatch } from 'react-redux';
import { add } from '../../Features/CartSlice';

const DishDetails = () => {

  const dispatch = useDispatch();

  const dish = JSON.parse(sessionStorage.getItem('singleDish'));
  console.log('selectedDish : ', dish);

  const { dishPrice, file, category, dishDescription, dishIngredients, dishMacros, dishName, type } = dish && dish;

  const description = dishDescription.split('.');
  const macros = dishMacros.split(',');

  return (

    <main className="dishDetailsContainer">

      <section className="dishControls">
        <div className="dishImg">
          <img src={file} alt={dishName} />
        </div>
        <div className="priceContainer">
          <p>{dishPrice}Rs</p>
          <div className="controls">
            <button className='btn' onClick={() => dispatch(add(dish))}>Add To Cart</button>
          </div>
        </div>
      </section>

      <section className="dishDescriptionContainer">
        <div className="descriptionHeader spacing">
          <h3>{category}</h3>
          <h2>{dishName}</h2>
        </div>

        <div className="dishIngredients spacing">
          <h3>Ingredients</h3>
          <p>{dishIngredients}</p>
        </div>

        <div className="dishDescription spacing">
          <h3>Description</h3>
          {
            description.map((currElem, index) => {
              return <p key={index}>{currElem}</p>
            })
          }
        </div>

        <div className="dishMacros spacing">
          <h3>Macros</h3>
          {
            macros.map((currElem, index) => {
              return <p key={index}>{currElem}</p>
            })
          }
        </div>
      </section>

    </main>

  )
}

export default DishDetails
