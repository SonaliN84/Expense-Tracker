import {createSlice} from "@reduxjs/toolkit";

const initialToken=localStorage.getItem('token')
const userIsLoggedIn=!!initialToken;
const initialAuthState={
  token:initialToken,
  isLoggedIn:userIsLoggedIn,
  ProfileName:'',
  profilePhotoUrl:''
}
const authSlice=createSlice({
    name:'auth',
    initialState:initialAuthState,
    reducers:{
      login(state,action){
        state.token=action.payload; 
        console.log("token",state.token)
        console.log("payload",action.payload)
        state.isLoggedIn=true;
        localStorage.setItem('token',action.payload)
      }, 
      logout(state){
       state.token=null;
       state.isLoggedIn=false;
       localStorage.removeItem('token')
      },
      setProfileName(state,action){
        state.ProfileName=action.payload;
      },
      setprofilePhotoUrl(state,action){
        state.profilePhotoUrl=action.payload;
      }

    }
})
export const authActions=authSlice.actions;
export default authSlice.reducer;