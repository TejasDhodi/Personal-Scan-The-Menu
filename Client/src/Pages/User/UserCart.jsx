import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { FaChevronCircleLeft, FaTrashAlt } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { remove, increase, decrease } from '../../Features/CartSlice'
import axios from 'axios'
import { tableNumberData } from '../../Service/User'

const UserCart = () => {
    const [cartData, setCartData] = useState([]);
    const [total, setTotal] = useState(0);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [orderDelivered, setOrderDelivered] = useState(false);
    const [isTableOccupied, setIsTableOccupied] = useState(false);
    const [tableNumber, setTableNumber] = useState(null);

    const dispatch = useDispatch();
    const data = useSelector(state => state.cart);
    const userName = useSelector(state => state.authentication.userProfile?.fullName)
    const cartLength = data.data.length;
    const navigate = useNavigate();

    const handleRemoveItem = (id) => {
        dispatch(remove(id));
    };

    const handleIncreaseQuantity = (id) => {
        dispatch(increase({ id }))
    }

    const handleDecreaseQuantity = (id) => {
        dispatch(decrease({ id }))
    }

    const handleTotalAmount = () => {
        let totalAmount = 0;
        cartData.forEach((currElem) => {
            return totalAmount += currElem.dishPrice * Number(currElem.quantity)
        })
        setTotal(totalAmount)
    }

    const handleTotalQuatity = () => {
        let quantities = 0;
        cartData.forEach((currElem) => {
            quantities += Number(currElem.quantity);
        });
        setTotalQuantity(quantities);
    }

    const handleGoBack = () => {
        navigate(-1);
    }

    // const handleCheckout = async () => {
    //     try {
    //         const response = await axios.post('http://localhost:3000/api/v1/checkout', {
    //             user: userName, orderedDish: data, amount: total, orderDelivered
    //         })

    //         const paymentData = response.data?.orderData;
    //         console.log('Payment Data : ', paymentData);

    //         var options = {
    //             "key": import.meta.env.VITE_SECRET_KEY_ID,
    //             "amount": paymentData.amount,
    //             "currency": "INR",
    //             "name": "Scan The Menu",
    //             "description": "Test Transaction",
    //             "image": "https://example.com/your_logo",
    //             "order_id": paymentData.order_id,
    //             "callback_url": "http://localhost:3000/api/v1/checkout/verifyPayment",
    //             "prefill": {
    //                 "name": "Gaurav Kumar",
    //                 "email": "gaurav.kumar@example.com",
    //                 "contact": "9000090000"
    //             },
    //             "notes": {
    //                 "address": "Razorpay Corporate Office"
    //             },
    //             "theme": {
    //                 "color": "#EA6D27"
    //             }
    //         };

    //         var razor = new Razorpay(options);
    //         razor.open();

    //     } catch (error) {
    //         console.log('Unable to proceed for Payments : ', error);
    //     }
    // }

    const randomText = Math.floor(Math.random() * 10000) + 1;

    const finalText = userName + randomText

    const handlePlaceOrder = async () => {
        try {
            const response = await axios.post('http://localhost:3000/api/v1/placeOrder', {
                user: userName,
                orderedDish: data,
                amount: total,
                tableNo: tableNumber,
                isTableOccupied: true,
                order_id: finalText
            })

            const datas = response.data?.orderData;
            console.log('Payment Data : ', datas);

            if (response.status === 201) {
                alert('Data Added');
                navigate(`/success?payment_id=${finalText}&payment=${datas._id}`)
            }

        } catch (error) {
            console.log('Unable to place order', error);
        }
    }

    useEffect(() => {
        setCartData(data.data);
    }, [data])

    useEffect(() => {
        handleTotalAmount();
        handleTotalQuatity();
    }, [cartData])

    return (
        <main className='cartContainer main'>
            <div className="cartBack" onClick={handleGoBack}>
                <NavLink className='dFlex'><FaChevronCircleLeft />Shopping Continue</NavLink>
            </div>
            <div className="cartDetails">
                <h3>Shopping Cart</h3>
            </div>
            {
                cartLength === 0 ? <h2>Your Cart Is Empty</h2> :
                    <table className='cartData'>
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Title</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Total Price</th>
                                <th>Remove</th>
                            </tr>
                        </thead>

                        <tbody className='cartItems'>
                            {
                                cartData.map((currElem, index) => {
                                    const { dishName, file, dishPrice, quantity, _id } = currElem;
                                    return (
                                        <tr key={index}>
                                            <td className="itemImg">
                                                <img src={file} alt={dishName} />
                                            </td>
                                            <td className="itemTitle">
                                                <h4>{dishName}</h4>
                                            </td>
                                            <td className="itemQuantity">
                                                <h4 className='quantityControl dFlex'>
                                                    <span onClick={() => quantity <= 1 ? handleRemoveItem(_id) : handleDecreaseQuantity(_id)}>-</span>
                                                    {quantity}
                                                    <span onClick={() => handleIncreaseQuantity(_id)}>+</span>
                                                </h4>
                                            </td>
                                            <td className="itemPrice">
                                                <h4>{dishPrice} Rs</h4>
                                            </td>
                                            <td className='itemTotalprice'>
                                                <h4>{dishPrice * quantity} Rs</h4>
                                            </td>
                                            <td className="itemControls">
                                                <button onClick={() => handleRemoveItem(_id)}><FaTrashAlt /></button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }

                        </tbody>

                        <tfoot>
                            <tr>
                                <th colSpan={2}>&nbsp;</th>
                                <th>
                                    <label htmlFor="tableNo">Select Table No</label>
                                    <select name="tableNumber" id="tableNo" onChange={(e) => setTableNumber(e.target.value)}>
                                        <option value="" disabled>Select Table Number</option>

                                        {
                                            tableNumberData.map((tableNo, index) => (
                                                <>
                                                    <option value={tableNo} key={index}>{tableNo}</option>
                                                </>
                                            ))
                                        }
                                    </select>
                                </th>
                                <th>Total Items : <span>{totalQuantity}</span></th>
                                <th>Total Amount : <span>{total}Rs</span></th>
                                <th><button type='button' className='btn' onClick={handlePlaceOrder}>Checkout</button></th>
                            </tr>
                        </tfoot>
                    </table>
            }
        </main>
    )
}

export default UserCart
