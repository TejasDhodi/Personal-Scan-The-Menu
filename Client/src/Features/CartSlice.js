import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    data: []
};

const CartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        add: (state, action) => {
            const itemExist = state.data.find(item => item._id === action.payload._id);
            if (!itemExist) {
                state.data.push({ ...action.payload });
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