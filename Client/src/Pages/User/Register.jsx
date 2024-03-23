import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { FaUserCircle } from "react-icons/fa";
import axios from 'axios';


const Register = () => {
    const [registerInputs, setRegisterInputs] = useState({
        fullName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        enteredOtp: ''
    });

    const [errorMsg, setErrorMsg] = useState('');
    const [showVerification, setShowVerification] = useState(false);
    const [showInputs, setShowInputs] = useState(false);
    const [authToken, setAuthToken] = useState('');

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    // To hadle the onchange of inputs
    const handleRegisterInputs = (e) => {
        const { value, name } = e.target;
        setRegisterInputs({
            ...registerInputs,
            [name]: value
        });
    };

    // To Send Otp
    const handleSendOtp = async (e) => {
        try {
            e.preventDefault();
            setLoading(true)
            const response = await axios.post('https://personal-scan-the-menu.onrender.com/api/v1/sendmail', { email: registerInputs.email }, {
                headers: {
                    "Content-Type": 'application/json'
                }
            })

            if (response.status === 200) {
                setShowVerification(true);
                alert('Otp Sent')
                setLoading(false);
            }

            setErrorMsg('')
        } catch (error) {
            setLoading(false)
            setErrorMsg(error.response.data.message)
            console.log('Error While Sending Otp To Mail');
        }
    }

    // To Verify Otp
    const handleVerifyOtp = async (e) => {
        try {
            e.preventDefault();
            setLoading(true)
            const response = await axios.post('https://personal-scan-the-menu.onrender.com/api/v1/sendmail/verify', {
                email: registerInputs.email,
                enteredOtp: Number(registerInputs.enteredOtp)
            });

            const data = response.data;


            if (response.status === 200) {
                alert('Email Verified');
                setAuthToken(data?.token)
                setShowInputs(true);
                setShowVerification(false)
                setLoading(false);
            }

            setErrorMsg('');

        } catch (error) {
            setLoading(false);
            setErrorMsg(error.response.data.message)
            console.log('Unable to verify otp : ', error);
        }
    }

    // To Register The User
    const handleRegisterSubmit = async (e) => {
        try {
            e.preventDefault();
            setLoading(true);
            console.log(registerInputs);
            const response = await axios.post('https://personal-scan-the-menu.onrender.com/api/v1/register', registerInputs, {
                headers: {
                    "Content-Type": 'application/json',
                    Authorization: `Bearer ${authToken}`
                }
            });

            if (response.status === 201) {
                alert('Registration SuccessFull')
                navigate('/signin')
                setLoading(false)
            }
            const data = response.data;
            setErrorMsg('');
            console.log('Registered User: ', data);
        } catch (error) {
            setLoading(false);
            setErrorMsg(error.response.data.message)
            console.log('Error while registering user : ', error);
        }

    };

    return (
        <main className='formContainer main'>
            <form className="form" onSubmit={authToken && handleRegisterSubmit}>

                <div className="authHeader linkIcons">
                    <FaUserCircle />
                    <h3>Register</h3>
                </div>

                <div className="inputFields">
                    <p>{JSON.stringify(errorMsg)}</p>
                    <div className="inputs">
                        <label htmlFor="email">Email Id</label>
                        <div className="emailVal">
                            <input type="email" name="email" id="email" value={registerInputs.email} onChange={handleRegisterInputs} placeholder='Enter Your Email Id' autoFocus />
                            {
                                showInputs ?
                                    <span>✅</span> :
                                    <button onClick={handleSendOtp}>{showVerification ? 'Resend' : loading ? '...' : 'Get Otp'}</button>
                                    
                            }
                        </div>
                        {
                            showVerification &&
                            <div className="emailVal otpVal">
                                <input type="text" name="enteredOtp" id="enteredOtp" value={registerInputs.enteredOtp} onChange={handleRegisterInputs} autoFocus />
                                <button onClick={handleVerifyOtp}>{loading? '...' : 'Verify'}</button>
                            </div>
                        }
                    </div>

                    {
                        showInputs && <>
                            <div className="inputs">
                                <label htmlFor="name">Full Name</label>
                                <input type="text" name='fullName' id='name' value={registerInputs.fullName} onChange={handleRegisterInputs} />
                            </div>
                            <div className="inputs">
                                <label htmlFor="phone">Phone Number</label>
                                <input type="text" name='phone' id='phone' value={registerInputs.phone} onChange={handleRegisterInputs} />
                            </div>
                            <div className="inputs">
                                <label htmlFor="password">Password</label>
                                <input type="text" name='password' id='password' value={registerInputs.password} onChange={handleRegisterInputs} />
                            </div>
                            <div className="inputs">
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input type="password" name='confirmPassword' id='confirmPassword' value={registerInputs.confirmPassword} onChange={handleRegisterInputs} />
                            </div>
                        </>
                    }
                </div>

                <div className="controls">
                    <button type='submit' className="btn">{loading? '...' : 'Submit'}</button>
                </div>

                <div className="askAccount">
                    <p>Already have an Account?? <NavLink to='/signin'>Click Here</NavLink> </p>
                </div>

            </form>
        </main>
    );
};

export default Register;
