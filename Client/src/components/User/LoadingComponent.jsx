import React from 'react'

const LoadingComponent = ({size}) => {

    const dishSize = Array.from({ length: size });

    return (
        <div className='loadingContainer' style={{display: 'flex', justifyContent:'center', gap: '1rem'}}>
            {
                dishSize.map((_, index) => (
                    <div className='dish loading' key={index}>
                        <div className="dishImage loadingDishImage">
                            <img alt='' />
                        </div>
                        <div className="dishBody laodingDishBody">
                            <div className="dishtHeader loadingDishtHeader">
                                <h3></h3>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>

    )
}

export default LoadingComponent
