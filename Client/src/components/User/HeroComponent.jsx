import React from 'react'

const HeroComponent = () => {
  return (
    <div className="hero">
      <div className="heroDescription">
        <h1>"Who needs a Michelin star when you have the finest flavors at our restaurant?"</h1>
        {/* <div className="btn">
          <button className='btn'>Book Table</button>
        </div> */}
      </div>
      <div className="heroImageContainer">
        <div className="heroImage">
          <img src="/Images/main.png" alt="" />
          <img src="/Images/dish-2.png" alt="" />
        </div>
      </div>
    </div>
  )
}

export default HeroComponent
