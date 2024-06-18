import { createSlice } from '@reduxjs/toolkit'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const storedWishList = localStorage.getItem('Dish WishList');

let initialState = {
    wishList: []
};

if (storedWishList) {
    try {
        initialState = {
            wishList: JSON.parse(storedWishList)
        };
    } catch (error) {
        console.error('Error parsing stored wish list:', error);
    }
}


const wishListSlice = createSlice({
    name: 'wishList',
    initialState,
    reducers: {
        addToWishList: (state, action) => {
            const dishId = action.payload._id;
            const isDishInWishList = state.wishList.find(dish => dish._id === dishId);

            if (!isDishInWishList) {
                console.log('available Dish : ', isDishInWishList);
                toast.success('Item Added in wishlist', {
                    autoClose: 500
                })
                state.wishList = [...state.wishList, action.payload]
                return localStorage.setItem('Dish WishList', JSON.stringify(state.wishList));
            } else {
                toast.warning('Item Already in wishlist', {
                    autoClose: 500
                })
            }
        },
        removeFromWishList: (state, action) => {
            state.wishList = state.wishList.filter(dish => dish._id !== action.payload)
            localStorage.setItem('Dish WishList', JSON.stringify(state.wishList));
        }
    }
});


export const { addToWishList, removeFromWishList } = wishListSlice.actions;
export default wishListSlice.reducer;