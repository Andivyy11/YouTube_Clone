import { createSlice } from '@reduxjs/toolkit'

const initialState ={
  loading:false,
  currentuser:null,
  error:false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: { 
    loginStart: (state)=>{
      state.loading=true
    },
    loginSuccess: (state,action)=>{
      state.currentuser=action.payload
      state.loading=false
    },
    loginfailure: (state)=>{
      state.error=true 
    },
    logout: (state)=>{
      state=initialState 
    } ,
    subscribe: (state,action)=>{
      if(!state.currentuser.subscribed.includes(action.payload))
      {
        state.currentuser.subscribed.push(action.payload)
        console.log('subscribing..')
      }
      else
      {
        state.currentuser.subscribed.splice(state.currentuser.subscribed.findIndex((userId)=> userId === action.payload) , 1)
        console.log('unsubscribing..')
      }
    }
  }
})

export const { loginStart , loginSuccess , loginfailure ,logout, subscribe } = userSlice.actions
export default userSlice.reducer