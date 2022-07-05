import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userInfo: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loggedIn: (state, action) => {
            state.userInfo = action.payload;
        },

        loggedOut: (state) => {
            state.userInfo = null;
        },
    },
});

export const { loggedIn, loggedOut } = userSlice.actions;
export default userSlice.reducer;
