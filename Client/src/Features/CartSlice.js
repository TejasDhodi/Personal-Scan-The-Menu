import { createSlice } from '@reduxjs/toolkit'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialState = {
    data: []
};

const CartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        add: (state, action) => {
            const itemExist = state.data.find(item => item._id === action.payload._id);

            if (itemExist) {
                toast.warning('Item Already In Cart', {
                    autoClose: 500
                })
            } else {
                state.data.push({ ...action.payload });

                toast.success('Added To Cart', {
                    autoClose: 500
                })
            }

        },
        remove: (state, action) => {
            state.data = state.data.filter(item => item._id !== action.payload);
        },
        increase: (state, action) => {
            const findItem = state.data.find(item => item._id === action.payload.id);
            const found = findItem && findItem.quantity++
        },
        decrease: (state, action) => {
            const findItem = state.data.find(item => item._id === action.payload.id);
            findItem && findItem.quantity--
        }
    }
});

export const { add, remove, increase, decrease } = CartSlice.actions;
export default CartSlice.reducer;