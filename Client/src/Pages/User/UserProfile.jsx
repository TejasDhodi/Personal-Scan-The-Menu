import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaHeart, FaUser } from 'react-icons/fa'
import { FaClockRotateLeft } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import DishesComponent from '../../components/User/DishesComponent';
import { setProfileToggleTrue } from '../../Features/FilterSlice';

const UserProfile = () => {

    const [recentOrders, setRecentOrders] = useState([]);
    const [content, setContent] = useState(null);

    const userName = useSelector(state => state.authentication.userProfile?.fullName);
    const encodedName = encodeURIComponent(userName)

    const wishList = useSelector(state => state.wishList.wishList);
    const isProfileToggle = useSelector(state => state.filters.profileToggle);

    const dispatch = useDispatch();

    const handleShowContents = (contentName) => {
        setContent(contentName);
    }

    const handleRecentOrders = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/v1/recentOrders/${encodedName}`);
            const data = response.data?.recentOrders;

            if (response.status === 200) {
                setRecentOrders(data)
            }

            console.log('Mapped Result With D Name : ', data.map((e, index) => e.orderedDish.data[0]).map(i => i[0]));
        } catch (error) {
            console.log('Unable to fetch ecent oorders');
        }
    }

    useEffect(() => {
        if (!content) {
            handleShowContents('recent')
        }
    }, [content])

    useEffect(() => {
        handleRecentOrders()
    }, [userName])

    return (
        <main className='profile'>

            <section className="profileNav">
                <div className="getProfileLinks">
                    <button className="filterButton" onClick={() => dispatch(setProfileToggleTrue())}>{isProfileToggle && '<-'}Filter {!isProfileToggle && '->'}</button>
                </div>
                <div className="profileControls">
                    <ul className={isProfileToggle? "userNavLinks showUserNavlinks": "userNavLinks"} >
                        <li className={content === 'wishList' ? 'linkIcons activePro' : 'linkIcons'} onClick={() => handleShowContents('wishList')}><FaHeart /> Wishlist</li>
                        <li className={content === 'recent' ? 'linkIcons activePro' : 'linkIcons'} onClick={() => handleShowContents('recent')}><FaClockRotateLeft /> Recent Orders</li>
                    </ul>
                </div>
            </section>

            <section className="profileContents">

                {
                    content === 'wishList' &&
                    <div className="wishList allDishes">
                        {
                            wishList && wishList.map((list, index) => {
                                const { _id, file, dishName, dishPrice, type } = list;
                                return (
                                    <DishesComponent
                                        key={_id}
                                        file={file}
                                        dishName={dishName}
                                        dishPrice={dishPrice}
                                        type={type}
                                        currElem={list}
                                        wishList='wishList'
                                    />
                                )
                            })
                        }

                        {
                            wishList && wishList.length === 0 && <h2>Nothing Available In Wishlist</h2>
                        }
                    </div>
                }

                {
                    content === 'recent' &&
                    <div className="recentOrders allDishes">
                        {
                            recentOrders.map(order => (
                                <React.Fragment key={order._id}>
                                    {
                                        order.orderedDish.data.map(dish => (
                                            <DishesComponent
                                                key={dish._id}
                                                file={dish.file}
                                                dishName={dish.dishName}
                                                type={dish.type}
                                                currElem={dish}
                                            />
                                        ))
                                    }
                                </React.Fragment>
                            ))
                        }
                        {
                            recentOrders.length === 0 && <h2>You Have Not Places Any Order Yet</h2>
                        }
                    </div>
                }






            </section>

        </main>
    )
}

export default UserProfile
