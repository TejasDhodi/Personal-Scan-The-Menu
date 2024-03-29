import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    data: JSON.parse(localStorage.getItem('authToken')) || null,
    userProfile: '',
    adminAuth: JSON.parse(localStorage.getItem('adminAuthToken')) || null,
};

const authSlice = createSlice({
    name: 'Authentication',
    initialState,
    reducers: {
        saveAuthToken: (state, action) => {
            state.data = action.payload;
            localStorage.setItem('authToken', JSON.stringify(action.payload));
        },
        saveAdminAuthToken: (state, action) => {
            state.adminAuth = action.payload
            localStorage.setItem('adminAuthToken', JSON.stringify(action.payload));
        },
        saveUserProfileDetails: (state, action) => {
            state.userProfile = action.payload
        },
        removeAuthToken: (state, action) => {
            state.data = null;
            localStorage.removeItem('authToken')
        },
        removeAdminAuthToken: (state, action) => {
            state.adminAuth = null;
            localStorage.removeItem('adminAuthToken')
        }
    }
});

export const { saveAuthToken, saveAdminAuthToken, saveUserProfileDetails, removeAuthToken, removeAdminAuthToken } = authSlice.actions;
export default authSlice.reducer;