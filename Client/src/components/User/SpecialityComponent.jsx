import React from 'react'
import { FaCheck } from "react-icons/fa";
const SpecialityComponent = ({ img, title, description, l1, l2 }) => {
    return (
        <div className="speciality">
            <div className="specialityImg">
                <img src={img} alt={title} />
            </div>
            <div className="specialityDescription">
                <h3>{title}</h3>
                <p>{description}</p>
                {
                    l1 && l2 &&
                    <>
                        <p><FaCheck /> {l1}</p>
                        <p><FaCheck /> {l2}</p>
                    </>
                }
            </div>
        </div>
    )
}

export default SpecialityComponent
