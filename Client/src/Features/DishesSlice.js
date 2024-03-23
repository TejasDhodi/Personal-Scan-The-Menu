import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    Dishes: [],
    searchedDishes: []
};

const DishesSlice = createSlice({
    name: 'Dish',
    initialState,
    reducers: {
        getDish: (state, action) => {
            state.Dishes = action.payload;
        },
        searchedDish: (state, action) => {
            state.searchedDishes = action.payload
        }
    }
});

export const { getDish, searchedDish } = DishesSlice.actions;
export default DishesSlice.reducer;