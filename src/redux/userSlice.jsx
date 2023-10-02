import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    name: []
}
const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        // Get All user Data from database
    getUser : (state, action) => {
    state.users = action.payload.map(user => {
     return{
    id: user._id,
    name: user.name,
    email: user.email,
    age: user.age
    }
})
},

// Send User data in database
addUser: (state, action) => {
 state.users.push(action.payload)
},

// Update Users data
updateUser: (state, action) => {
   const index = state.users.findIndex(x => x.id === action.payload.id);
   state.users[index] = 
   { 
    id: action.payload.id,
    name: action.payload.name,
    email: action.payload.email,
    age: action.payload.age
   }
},

// delete Users data
deleteUser: (state, action) => {
    state.users = state.users.filter(user => user.id !== action.payload);
  }

    }
});

export const {getUser, addUser, updateUser, deleteUser} = userSlice.actions;
export default userSlice.reducer;