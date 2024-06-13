import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { FaChevronCircleLeft, FaTrashAlt } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { remove, increase, decrease } from '../../Features/CartSlice'
import axios from 'axios'
import { tableNumberData } from '../../Service/User'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserCart = () => {
    const [cartData, setCartData] = useState([]);
    const [total, setTotal] = useState(0);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [tableNumber, setTableNumber] = useState(null);

    const [occupiedTable, setOccupiedTable] = useState([]);
    const [occupiedTableNo, setOccupiedtableNo] = useState([]);
    const [leftTableNo, setLeftTableNo] = useState([]);

    const [showOnlinePayment, setShowOnlinePayment] = useState(false);

    const dispatch = useDispatch();
    const data = useSelector(state => state.cart);
    const userName = useSelector(state => state.authentication.userProfile?.fullName)
    const userEmail = useSelector(state => state.authentication.userProfile?.email)
    const userPhone = useSelector(state => state.authentication.userProfile?.phone)
    const cartLength = data.data.length;
    const navigate = useNavigate();

    const selectPaymentMode = (e) => {
        if (e.target.value === 'Online') {
            setShowOnlinePayment(true);
        } else {
            setShowOnlinePayment(false)
        }
    }
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

    const randomText = Math.floor(Math.random() * 10000) + 1;

    const finalText = userName + randomText

    const handlePlaceOrderOnline = async () => {
        try {
            const response = await axios.post('https://personal-scan-the-menu.onrender.com/api/v1/placeOrder/online', {
                user: userName,
                orderedDish: data,
                amount: total,
                tableNo: tableNumber,
            })

            const paymentData = response.data?.orderData;
            console.log('Payment Data : ', paymentData);

            var options = {
                "key": import.meta.env.VITE_SECRET_KEY_ID,
                "amount": paymentData.amount,
                "currency": "INR",
                "name": "Scan The Menu",
                "description": "Test Transaction",
                "image": "/Images/Nav-Brand.jpeg",
                "order_id": paymentData.order_id,
                "callback_url": "https://personal-scan-the-menu.onrender.com/api/v1/placeOrder/online/verify",
                "prefill": {
                    "name": userName,
                    "email": userEmail,
                    "contact": `+91 ${userPhone}`
                },
                "notes": {
                    "address": "#"
                },
                "theme": {
                    "color": "#EA6D27"
                }
            };

            var razor = new Razorpay(options);
            razor.open();

        } catch (error) {
            let warn = (error.response.data.error).split(':');
            toast.warning(warn[2], {
                autoClose: 1500
            })
            console.log('Unable to place order online : ', error);
        }
    }
    const handlePlaceOrder = async () => {
        try {
            const response = await axios.post('https://personal-scan-the-menu.onrender.com/api/v1/placeOrder', {
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

                toast.success('Order Placed', {
                    autoClose: 1500
                })

                navigate(`/success?payment_id=${finalText}&payment=${datas._id}`)
            }


        } catch (error) {
            let warn = (error.response.data.error).split(':');
            toast.warning(warn[2], {
                autoClose: 1500
            })
            console.log('Unable to place order : ', error);
        }
    }

    const handleOccupiedTable = async () => {
        try {
            const response = await axios.get('https://personal-scan-the-menu.onrender.com/api/v1/occupied');
            const data = response.data?.getTableNo;

            if (response.status === 200) {
                setOccupiedTable(data);
            }
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        setCartData(data.data);
    }, [data])

    useEffect(() => {
        handleTotalAmount();
        handleTotalQuatity();
        handleOccupiedTable();
    }, [cartData])

    useEffect(() => {
        const receivedTableNo = occupiedTable.map(item => item.tableNo);
        setOccupiedtableNo(receivedTableNo)
    }, [occupiedTable])

    useEffect(() => {
        console.log('Occupied table number', occupiedTableNo);
        let allValues = [...occupiedTableNo, ...tableNumberData]
        let leftTables = allValues.filter(tableNo => !occupiedTableNo.includes(tableNo) || !tableNumberData.includes(tableNo));

        setLeftTableNo(leftTables)
    }, [occupiedTable])

    return (
        <main className='cartContainer main'>
            <div className="cartBack" onClick={handleGoBack}>
                <NavLink className='dFlex'><FaChevronCircleLeft />Shopping Continue</NavLink>
            </div>
            <div className="cartDetails">
                <h3>Shopping Cart</h3>
            </div>
            <div className="cartTable">
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

                            <tfoot className='cartFooter'>
                                <tr>
                                    <th colSpan={2}>
                                        <select name="tableNumber" id="tableNo" onChange={(e) => setTableNumber(e.target.value)}>
                                            <option value="#" className='disabledOption'>Select Table Number</option>

                                            {
                                                leftTableNo.map((tableNo, index) => (
                                                    <>
                                                        <option value={tableNo} key={index}>{tableNo}</option>
                                                    </>
                                                ))
                                            }
                                        </select>
                                    </th>
                                    <th>Total Items : <span>{totalQuantity}</span></th>
                                    <th>Total Amount : <span>{total}Rs</span></th>
                                    <th><select name="paymentMode" id="paymentMode" onChange={selectPaymentMode}>
                                        <option value="#" className='disabledOption'>Select Payment Method</option>
                                        <option value="COD">COD</option>
                                        <option value="Online">Online</option>
                                    </select></th>
                                    {

                                        showOnlinePayment ? <th><button type='button' className='btn' onClick={handlePlaceOrderOnline}>Online</button></th>
                                            : <th><button type='button' className='btn' onClick={handlePlaceOrder}>Checkout</button></th>
                                    }

                                </tr>
                            </tfoot>
                        </table>
                }
            </div>
        </main>
    )
}

export default UserCart
