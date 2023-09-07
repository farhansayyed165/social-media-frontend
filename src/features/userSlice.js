import { createSlice } from "@reduxjs/toolkit";

const initialState = {fullname:"", username:"", avatar:"", email:"", password:"", _id:"", login:false}


const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    Auth: (state, action) => {
      state.user = action.payload;
      console.log(action)
    },
    UnAuth: (state) => {
      state.user = initialState;
    },
  },
});

export const { Auth, UnAuth } = userSlice.actions;
export default userSlice.reducer;
