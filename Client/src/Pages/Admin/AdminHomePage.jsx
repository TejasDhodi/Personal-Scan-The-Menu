import React, { useEffect, useState } from 'react'
import axios from 'axios'

const AdminHomePage = () => {

  const [paymentData, setPaymentData] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [users, setUsers] = useState(0);

  const getPaymentData = async () => {
    try {
      const response = await axios.get('https://personal-scan-the-menu.onrender.com/api/v1/paymentData');
      const data = response.data?.paymentData;

      if (response.status === 200) {
        setPaymentData(data);
      }
    } catch (error) {
      console.log('Unable to fetch payment data');
    }
  }

  const getAllUser = async () => {
    try {
      const response = await axios.get('https://personal-scan-the-menu.onrender.com/api/v1/allUsers');

      const data = response.data?.users

      if (response.status === 200) {
        setUsers(data.length)
      }
    } catch (error) {

    }
  }

  const handleRevenue = () => {
    let revenue = 0;

    paymentData.forEach(payment => {
      revenue += Number(payment.amount) / 83
    })
    setTotalRevenue(revenue)

  }

  useEffect(() => {
    getPaymentData();
    getAllUser();
  }, [])

  useEffect(() => {
    handleRevenue();
  }, [paymentData])

  return (
    <main className='main'>

      <section className="dashboard">

        <div className="widget">
          <h2>Total Orders</h2>
          <p>{paymentData?.length}</p>
        </div>

        <div className="widget">
          <h2>Revenue</h2>
          <p>${totalRevenue.toFixed(2)}</p>
        </div>
        
        <div className="widget">
          <h2>Customes</h2>
          <p>{users}</p>
        </div>

      </section>
    </main>
  )
}

export default AdminHomePage
