import { createSlice } from "@reduxjs/toolkit";



export const messageSlice = createSlice({
    name: "message",
    initialState: {
        value: false
    },
    reducers: {
        messageChange: (state, action) => {
            state.value = !(state.value);

        },

        // logout: (state) => {
        //     state.value = null;
        // },

        // upload: (state, action) => {
        //     state.value = action.payload;
        // }


    }

})

export const { messageChange } = messageSlice.actions;


export default messageSlice.reducer;
