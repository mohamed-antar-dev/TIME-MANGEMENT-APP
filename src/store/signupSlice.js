import { createSlice } from "@reduxjs/toolkit";

const signupSlice = createSlice({
    name: "signup",
    initialState: {
        Username: "",
        email: "",
        password: "",
        confirmPassword: ""
    },
    reducers: {
        updateField: (state, action) => {
            const { field, value } = action.payload; // Fixed: was action.payLoad
            state[field] = value;
        },
        resetForm: (state) => {
            state.Username = "";
            state.email = "";
            state.password = "";
            state.confirmPassword = "";
        }
    }
});

export const { updateField, resetForm } = signupSlice.actions;
export default signupSlice.reducer;