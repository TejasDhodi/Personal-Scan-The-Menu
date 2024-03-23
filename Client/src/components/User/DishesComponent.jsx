import React, { useEffect, useState } from 'react'
import { FaHeart, FaQuestion } from "react-icons/fa";
import { IoTriangleSharp } from "react-icons/io5";
import { add } from '../../Features/CartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishList, removeFromWishList } from '../../Features/WishListSlice';

const DishesComponent = ({ file, dishName, type, handleShowDescription, dishPrice, currElem, wishList }) => {

  const dispatch = useDispatch();
  
  const authToken = useSelector(state => state.authentication.data);
  const [popUp, setPopUp] = useState(false)

  const handleWishList = (dish) => {
    console.log(dish);
    setPopUp(true)

    setTimeout(() => {
      setPopUp(false)
    }, 300);

    authToken && dispatch(addToWishList(dish))
  };


  return (
    <>
      <div className='dish' onDoubleClick={() => handleWishList(currElem)}>
        <div className={popUp ? "likePart popLike" : "likePart"}>
          <FaHeart />
        </div>
        <div className="dishImage">
          <img src={file} alt={dishName} />
          {handleShowDescription && <span className='dishDetals' onClick={() => handleShowDescription(dishName)}>< FaQuestion /></span>}
          <span className={type === 'veg' ? 'category veg' : 'category nonveg'}><IoTriangleSharp /></span>
        </div>
        <div className="dishBody">
          <div className="dishtHeader">
            <h3>{dishName}</h3>
          </div>
          {
            dishPrice &&
            <div className="priceContainer">
              {
                !wishList ?
                  <>
                    <p>{dishPrice}Rs</p>
                    <div className="controls">
                      <button className='btn' onClick={() => dispatch(add(currElem))}>Add To Cart</button>
                    </div>
                  </> :
                  <div className="controls expandControls">
                    <button className='btn' onClick={() => dispatch(add(currElem))}>Add To Cart</button>
                    <button className='btn' onClick={() => dispatch(removeFromWishList(currElem._id))}>Remove</button>
                  </div>
              }
            </div>
          }
        </div>
      </div>
    </>
  );
}

export default DishesComponent;
