import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { FaUserCircle } from 'react-icons/fa';
import axios from 'axios';
import { useDispatch } from 'react-redux'
import { saveAuthToken } from '../../Features/AuthSlice';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {

  const [loginInputs, setLoginInputs] = useState({
    email: '',
    password: '',
    enteredOtp: ''
  });

  const [errorMsg, setErrorMsg] = useState('');
  const [showVerification, setShowVerification] = useState(false);
  const [showInputs, setShowInputs] = useState(false);
  const [authToken, setAuthToken] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLoginInputs = (e) => {
    const { value, name } = e.target;
    setLoginInputs({
      ...loginInputs,
      [name]: value
    });
  }

  const dispatch = useDispatch();
  const navigate = useNavigate();


  // To Send Otp
  const handleSendOtp = async (e) => {
    try {
      e.preventDefault();
      setLoading(true)
      const response = await axios.post('https://personal-scan-the-menu.onrender.com/api/v1/sendmail', { email: loginInputs.email }, {
        headers: {
          "Content-Type": 'application/json'
        }
      })

      if (response.status === 200) {
        setShowVerification(true);

        toast.success('Otp Sent', {
          autoClose: 1500
        })
        
        setLoading(false)
      }
      setErrorMsg('');
    } catch (error) {
      setLoading(false);
      setErrorMsg(error.response.data.message)
      console.log('Error While Sending Otp To Mail');
    }
  }

  // To Verify Otp
  const handleVerifyOtp = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const response = await axios.post('https://personal-scan-the-menu.onrender.com/api/v1/sendmail/verify', {
        email: loginInputs.email,
        enteredOtp: Number(loginInputs.enteredOtp)
      });

      const data = response.data;

      if (response.status === 200) {

        toast.success('Email Verified', {
          autoClose: 1500
        })

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

  const handleLoginUser = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);

      const response = await axios.post('https://personal-scan-the-menu.onrender.com/api/v1/login', loginInputs, {
        headers: {
          "Content-Type": 'application/json',
          Authorization: `Bearer ${authToken}`
        }
      })

      const data = response.data;
      console.log('Auth Token : ', data?.token);

      if (response.status === 200) {

        toast.success('Login Success', {
          autoClose: 1500
        })

        dispatch(saveAuthToken(data?.token))
        setLoading(true)
        navigate('/menu')
      }

      setErrorMsg('');
    } catch (error) {
      setLoading(false)
      setErrorMsg(error.response.data.message)
      console.log('Unable to login user');
    }
  }

  return (
    <main className='formContainer'>
      <form className='form login' onSubmit={authToken && handleLoginUser}>
        <div className={showVerification ? "inputField loginInputField hideInputField" : "inputField loginInputField"}>
          <div className="authHeader linkIcons">
            <FaUserCircle />
            <h3>Login</h3>
          </div>

          <div className="inputFields">
            <p>{JSON.stringify(errorMsg)}</p>
            <div className="inputs">
              <label htmlFor="email">Email Id</label>
              <div className="emailVal">
                <input type="email" name="email" id="email" value={loginInputs.email} onChange={handleLoginInputs} placeholder='Enter Your Email Id' autoFocus />
                {
                  showInputs ?
                    <span>✅</span> :
                    <button onClick={handleSendOtp}>{showVerification ? 'Resend' : loading ? '...' : 'Get Otp'}</button>

                }
              </div>
              {
                showVerification &&
                <div className="emailVal otpVal">
                  <input type="text" name="enteredOtp" id="enteredOtp" value={loginInputs.enteredOtp} onChange={handleLoginInputs} autoFocus />
                  <button onClick={handleVerifyOtp}>{loading ? '...' : 'Verify'}</button>
                </div>
              }
            </div>

            {
              showInputs &&
              <div className="inputs">
                <label htmlFor="password">Password</label>
                <input type="password" name='password' id='password' value={loginInputs.password} onChange={handleLoginInputs} />
              </div>

            }
          </div>

          <div className="controls">
            <button type='submit' className='btn'>{loading ? '...' : 'Login'}</button>
          </div>

          <div className="askAccount">
            <p>Don't have an Account?? <NavLink to='/signup'>Click Here</NavLink> </p>
          </div>
        </div>

      </form>
    </main>
  )
}

export default Login
