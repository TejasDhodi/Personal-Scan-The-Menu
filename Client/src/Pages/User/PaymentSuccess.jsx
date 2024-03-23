import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

import { FaChevronCircleLeft } from 'react-icons/fa';
import { useSelector } from 'react-redux';


const PaymentSuccess = () => {
  const [paymentData, setPaymentData] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userName = useSelector(state => state.authentication.userProfile?.fullName)
  const paymentId = searchParams.get('payment');

  const handleGetPaymentDetail = async () => {
    try {
      const response = await axios.get(`https://personal-scan-the-menu.onrender.com/api/v1/placeOrder/detail/${paymentId}`);
      const data = response.data;
      setPaymentData(data.singlePayment);

      console.log('Detail ata : ', data);
    } catch (error) {
      console.log(`Unable to fetch details of ${paymentId}`);
    }
  }

  const handleTotalpayment = () => {
    let totalAmount = 0;
    paymentData?.orderedDish?.data.forEach(item => {
      return totalAmount += Number(item.dishPrice) * Number(item.quantity);
    });

    setTotal(totalAmount);
  };

  const handleTotalQuantities = () => {
    let quantities = 0;
    paymentData?.orderedDish?.data.forEach((currElem) => {
      quantities += Number(currElem.quantity);
    });
    setTotalQuantity(quantities);
  }

  const handleDownloadPDF = () => {
    if (!paymentData || !paymentData.orderedDish?.data || paymentData.orderedDish?.data?.length === 0) {
      console.error('No data available to download.');
      return;
    }

    const doc = new jsPDF();

    doc.text(`Customer Name : ${userName}`, 10, 10);
    doc.text(`Customer Order Id: ${paymentData?.order_id}`, 10, 20);
    doc.text(`Your Total Items: ${totalQuantity}`, 10, 30);
    doc.text(`Your Total Amount: ${total}Rs`, 10, 40);

    doc.text(`Order Details :-`, 10, 50);

    // const columns = ['Index', 'Dish Name', 'Dish Price', 'Total Price', 'Quantity', 'Cuisine', 'Category'];
    const columns = ['Index', 'Dish Name', 'Cuisine', 'Category', 'Dish Price', 'Quantity', 'Total Price' ];
    const rows = paymentData?.orderedDish.data.map((row, index) => [index + 1, row.dishName, row.cusine, row.category, row.dishPrice, row.quantity, row.dishPrice * row.quantity]);

    doc.autoTable({
      head: [columns],
      body: rows,
      startY: 70,
    });

    doc.save(`${paymentData?.order_id}.pdf`);
  };

  useEffect(() => {
    handleGetPaymentDetail();
    console.log('Payment Data : ', paymentData);
  }, [])

  useEffect(() => {
    handleTotalpayment()
    handleTotalQuantities()
  }, [paymentData])

  return (
    <main>
      {
        <section className="orderSuccess">
          <div className="cartBack">
            <NavLink to='/menu' className='dFlex'><FaChevronCircleLeft />Want To order More??</NavLink>
          </div>
          <div className="successMsg">
            <h2>Ordere Placed SuccessFully</h2>
            <h3>Thank You So Much For Your Valuable Time</h3>
          </div>

          <div className="orderIds">
            <h3>Your Order Id : {paymentData?.order_id}</h3>
            {/* <h3>Your Payment Id : {paymentData[0]?.razorpay_payment_id}</h3> */}
          </div>

          <table className='orderData'>
            <thead>
              <tr>
                <td>Index</td>
                <td>Dish Name</td>
                <td>Cusine</td>
                <td>Category</td>
                <td>Dish Price</td>
                <td>Quantity</td>
                <td>Total Price</td>
              </tr>
            </thead>
            <tbody>
              {
                paymentData?.orderedDish?.data?.map((currElem, index) => {
                  const { category, cusine, dishName, dishPrice, quantity } = currElem;
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{dishName}</td>
                      <td>{cusine}</td>
                      <td>{category}</td>
                      <td>{dishPrice}</td>
                      <td>{quantity}</td>
                      <td>{dishPrice * quantity}</td>
                    </tr>
                  )
                })
              }
            </tbody>
            <tfoot>
              <tr>
                <th colSpan={5}>&nbsp;</th>
                <th>Total Items : <span>{totalQuantity}</span></th>
                <th>Total Amount : <span>{total}Rs</span></th>
                {/* <th><button type='button' className='btn' onClick={() => handleCheckout()}>Checkout</button></th> */}
              </tr>
            </tfoot>
          </table>
          <div className="controls">
            <button className='btn' onClick={handleDownloadPDF}>Download Receipt</button>
          </div>
        </section>
      }
    </main>
  )
}

export default PaymentSuccess
