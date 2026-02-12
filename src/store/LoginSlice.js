import { createSlice } from "@reduxjs/toolkit";

const LoginSlice = createSlice({
    name: "Login",
    initialState: {
        email: "",
        password: "",
    },
    reducers: {
        updateField: (state, action) => {
            const { field, value } = action.payload; 
            state[field] = value;
        },
        resetForm: (state) => {
            state.email = "";
            state.password = "";
        }
    }
});

export const { updateField, resetForm } = LoginSlice.actions;
export default LoginSlice.reducer;