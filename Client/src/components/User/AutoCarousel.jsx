import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import DishesComponent from './DishesComponent';

const AutoCarousel = ({ dishes }) => {

    const [slidesToShow, setSlidesToShow] = useState(3);


    useEffect(() => {

        const handleResize = () => {
            if (window.innerWidth < 480) {
                setSlidesToShow(1);
            } else {
                setSlidesToShow(3);
            }
        };

        window.addEventListener('resize', handleResize);

        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };

    }, []);

    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: slidesToShow,
        slidesToScroll: 1,
        autoplay: true,
        speed: 700,
        autoplaySpeed: 3000,
        cssEase: "linear"

    };

    return (
        <>
            <Slider {...settings}>

                {
                    dishes && dishes.map((currElem, index) => {
                        const { dishName, file, dishIngredients, dishDescription, dishPrice, type, category, _id } = currElem;
                        return (
                            <DishesComponent
                                file={file}
                                dishName={dishName}
                                type={type}
                                category={category}
                                key={index}
                                currElem={currElem}
                                _id={_id}
                            />
                        )
                    })
                }
            </Slider>
        </>
    )
}

export default AutoCarousel
