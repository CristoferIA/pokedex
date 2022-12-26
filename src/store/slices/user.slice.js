import { createSlice } from '@reduxjs/toolkit'
const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        rename: (state, action)=>{ return action.payload;}
    }
})
export const {rename} = userSlice.actions
export default userSlice.reducer