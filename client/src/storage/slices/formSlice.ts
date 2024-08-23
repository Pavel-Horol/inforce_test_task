import {createSlice} from "@reduxjs/toolkit";

export interface FormState {
    isOpened: boolean
}

const initialState: FormState = {
    isOpened: false,
}

export const formSlice = createSlice({
    name: 'form',
    initialState: initialState,
    reducers: {
        close: (state) => {
            state.isOpened = false;
        },
        open: (state) => {
            state.isOpened = true;
        },
    }
})

export const {close, open} = formSlice.actions;
export default formSlice.reducer;