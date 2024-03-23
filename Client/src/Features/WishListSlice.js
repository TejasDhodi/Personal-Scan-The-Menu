import { createSlice } from '@reduxjs/toolkit'

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
            const isDishInWishList = state.wishList.some(dish => dish._id === dishId);

            if (!isDishInWishList) {
                console.log('available Dish : ', isDishInWishList);
                state.wishList = [...state.wishList, action.payload] // Mutating the state directly
                return localStorage.setItem('Dish WishList', JSON.stringify(state.wishList)); // Storing the updated wish list in local storage
            }
        },
        removeFromWishList : (state, action) => {
            state.wishList = state.wishList.filter(dish => dish._id !== action.payload)
            localStorage.setItem('Dish WishList', JSON.stringify(state.wishList));
        }
    }   
});


export const { addToWishList, removeFromWishList } = wishListSlice.actions;
export default wishListSlice.reducer;