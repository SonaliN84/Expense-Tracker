import React,{useState} from 'react';
 const AuthContext=React.createContext({
    token:'',
    isLoggedIn:false,
    login:(token)=>{},
    logout:()=>{},
    profilePhotoUrl:'',
    ProfileName:'',
    setProfileName:()=>{},
    setprofilePhotoUrl:()=>{}
    // userEmail:'',
    // setUserEmail:()=>{},
    // data:[],
    // setData:()=>{}
 })

 export const AuthContextProvider=(props)=>{
    const initialToken=localStorage.getItem('token')
    const [token,setToken]=useState(initialToken);

    const [ProfileName,setProfileName]=useState('');
    const [profilePhotoUrl,setprofilePhotoUrl]=useState('')
    // const [userEmail,setUserEmail]=useState('');
    // const [data,setData]=useState([]);

    const userIsLoggedIn=!!token;
    const loginHandler=(token)=>{
      setToken(token);
      localStorage.setItem('token',token)
      

    }

    const logoutHandler=()=>{
        setToken(null);
        localStorage.removeItem('token')
        // setData([])
        localStorage.removeItem('email')
    }
    

    const contextValue={
        token:token,
        isLoggedIn:userIsLoggedIn,
        login:loginHandler,
        logout:logoutHandler,
        profilePhotoUrl:profilePhotoUrl,
        ProfileName:ProfileName,
        setProfileName:setProfileName,
        setprofilePhotoUrl:setprofilePhotoUrl
        // userEmail:userEmail,
        // setUserEmail:setUserEmail,
        // data:data,
        // setData:setData,

    
    }
    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    )
 }
 export default AuthContext;