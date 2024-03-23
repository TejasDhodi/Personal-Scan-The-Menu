import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    multiFilter: false,
    profileToggle: false
}

const FilterSlice = createSlice({
    name: 'Filters',
    initialState,
    reducers: {
        setMultiFilterTrue: (state, action) => {
            state.multiFilter = !state.multiFilter
        },
        setProfileToggleTrue: (state, action) => {
            state.profileToggle = !state.profileToggle
        }
    }
});

export const {setMultiFilterTrue, setProfileToggleTrue} = FilterSlice.actions;
export default FilterSlice.reducer;