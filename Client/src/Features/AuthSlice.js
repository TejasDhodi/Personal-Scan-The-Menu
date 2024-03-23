import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    data: JSON.parse(localStorage.getItem('authToken')) || null,
    userProfile: '',
};

const authSlice = createSlice({
    name: 'Authentication',
    initialState,
    reducers: {
        saveAuthToken : (state, action) => {
            state.data = action.payload;
            localStorage.setItem('authToken', JSON.stringify(action.payload));
        },
        saveUserProfileDetails : (state, action) => {
            state.userProfile = action.payload
        },
        removeAuthToken: (state, action) => {
            state.data = null;
            localStorage.removeItem('authToken')
            state.isauThenticated = false
        }
    }
});

export const {saveAuthToken, saveUserProfileDetails, removeAuthToken} = authSlice.actions;
export default authSlice.reducer;