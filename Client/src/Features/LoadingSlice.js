import { createSlice} from '@reduxjs/toolkit'

const initialState = {
    dishLoading : false
};

const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
         showDishLoad : (state, action) => {
            state.dishLoading = true
         },
         hideDishLoad : (state, action) => {
            state.dishLoading = false
         }
    }
});

 export const {showDishLoad, hideDishLoad } = loadingSlice.actions;
 export default loadingSlice.reducer;