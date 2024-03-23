import React, { useState } from 'react'
import '../../Styles/User/UserPages.css'
// import UserInputComponent from '../../components/User/UserInputComponent'
import { contactCard, contactCredentials } from '../../Service/User'
import { FaPhoneVolume, FaEnvelope, FaLocationArrow } from 'react-icons/fa'

const Contact = () => {

    const [contact, setContact] = useState({
        name: '',
        phone: "",
        description: ''
    });

    const handleContactInputs = (e) => {
        const { name, value } = e.target;
        setContact({
            ...contact,
            [name]: value
        })
    }

    return (
        <main className='contactContainer'>
            <section className="map">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3749.4805195205877!2d72.75463507468747!3d19.98833747269983!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be726fe01774d39%3A0xf8c3b3b9452a9f48!2sSaravali%20Society%2C%20Dahanu%2C%20Raipada%2C%20Maharashtra%20401602!5e0!3m2!1sen!2sin!4v1706980626146!5m2!1sen!2sin"
                    allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </section>
            
            <section className="contactDetailsContainer">
                <div className="contactCard">
                    {
                        contactCard.map((elem, index) => {
                            const { icon, title, description } = elem;
                            return (
                                <div className="contactDetails" key={index}>
                                    <div className="contactDetailsIcon">
                                        {icon === 'FaPhoneVolume' && <FaPhoneVolume />}
                                        {icon === 'FaEnvelope' && <FaEnvelope />}
                                        {icon === 'FaLocationArrow' && <FaLocationArrow />}
                                    </div>
                                    <div className="contactInfo">
                                        <h3>{title}</h3>
                                        <p>{description}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                {/* <form className='contactForm'>
                    {
                        contactCredentials.map((currElem, index) => {
                            const { name, type, id, heading } = currElem;
                            return (
                                <UserInputComponent
                                    id={id}
                                    name={name}
                                    type={type}
                                    heading={heading}
                                    key={index}
                                    handleInputs={handleContactInputs}
                                    Inputs={contact}
                                />
                            )
                        })
                    }
                    <div className="inputs">
                        <label htmlFor="description">Description</label>
                        <textarea name="description" id="description" cols="20" rows="5" value={contact.description} onChange={handleContactInputs} />
                    </div>
                    <div className="controls">
                        <button type="submit" className='btn'>Submit</button>
                        <button type='reset' className='btn'>Reset</button>
                    </div>
                </form> */}
            </section>
        </main>
    )
}

export default Contact
