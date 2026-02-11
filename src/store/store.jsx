import { configureStore } from "@reduxjs/toolkit";
import signupReducer from "./signupSlice";
import uiReducer from "./uiSlice" 

 const store = configureStore({
  reducer: {
     signup: signupReducer,
     ui:uiReducer
  },
});


export default store;