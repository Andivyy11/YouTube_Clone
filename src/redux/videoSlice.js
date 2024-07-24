import { createSlice } from '@reduxjs/toolkit'

const initialState ={
  currentvideo:null,
  loading:false,
  error:false
}

export const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: { 
    fetchStart: (state)=>{
      state.loading=true
    },
    fetchSuccess: (state,action)=>{
      state.currentvideo=action.payload
      state.loading=false
    },
    fetchfailure: (state)=>{
      state.error=true 
    },
    like : (state,action)=>{
      if(!state.currentvideo.likes.includes(action.payload))
      {
        state.currentvideo.likes.push(action.payload)
        state.currentvideo.dislikes.splice(state.currentvideo.dislikes.findIndex((userId) => userId === action.payload ) , 1)
      }
    },
    dislike : (state,action)=>{
      if(!state.currentvideo.dislikes.includes(action.payload))
      {
        state.currentvideo.dislikes.push(action.payload)
        state.currentvideo.likes.splice(state.currentvideo.likes.findIndex((userId) => userId === action.payload ) , 1)
      }
    }
  }
})

export const { fetchStart , fetchSuccess , fetchfailure ,like , dislike } = videoSlice.actions
export default videoSlice.reducer