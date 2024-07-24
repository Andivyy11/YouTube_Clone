import { useRef } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { loginStart, loginSuccess, loginfailure } from '../redux/userSlice.js'
import { auth , provider } from '../firebase.js'
import { signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

const Formx = styled.div`
      width:340px;
      padding:20px 0;
      text-align:center;
      background-color:${({theme}) => theme.sidebarBg};
      margin:auto;
`
const Headd = styled.h2`
      color:${({theme}) => theme.sidebarText};
`
const Textt = styled.p`
      font-size:20px;
      margin:10px;
      color:${({theme}) => theme.sidebarText};
`
const TextFieldt = styled.input`
      width:80%;
      background-color:transparent;
      border:2px solid;
      border-color:${({theme}) => theme.mainText};
      color:${({theme}) => theme.mainText};
      font-size:17px;
      padding:8px 5px;
      margin:10px 0;
     
`
const FormBtn = styled.button`
      font-size:18px;
      padding:5px 10px;
      background-color:white;
      border:none;
`;

export default function Form()
{
      const usernameSignIn = useRef()
      const passwordSignIn = useRef()
      const usernameSignUp = useRef()
      const passwordSignUp = useRef()
      const email = useRef()

      const navigate = useNavigate()
      const dispatch = useDispatch()
      async function signIn()
      {
            dispatch(loginStart())
            try{
              const res=await axios.post('/auth/signin',{ name: usernameSignIn.current.value, password:passwordSignIn.current.value }) 
              dispatch(loginSuccess(res.data)) 
              navigate('/')
            }
            catch(err)
            {
                  dispatch(loginfailure())
                  console.log(err)
            }
      }
      async function signUp()
      {
        dispatch(loginStart())
         try{
            const r= await axios.post('/auth/signup' , {name : usernameSignUp.current.value , password: passwordSignUp.current.value , email : email.current.value})
            dispatch(loginSuccess(r.data))  
            navigate('/')
      } 
         catch(err)
         {
            dispatch(loginfailure())
            console.log(err) 
         } 
      }
      async function signInGoogle()
      {
            dispatch(loginStart())
            signInWithPopup(auth,provider).then((result) => { 
                  console.log(result);
            axios.post("/auth/google" , { name:result.user.displayName, email:result.user.email, profile:result.user.photoURL })
            .then( (res) => { dispatch(loginSuccess(res.data));  navigate('/') })
            }).catch((err)=> dispatch(loginfailure()))
      }
    return (
      <Formx>
        <Headd>Sign In</Headd>
        <Textt>to continue to YouTube</Textt>
        <TextFieldt type="text" ref={usernameSignIn} placeholder="Username"></TextFieldt>
        <TextFieldt type="password" ref={passwordSignIn} placeholder="Password"></TextFieldt>
        <FormBtn onClick={signIn}>Sign In</FormBtn>
        <Textt>Or</Textt>
        <FormBtn onClick={signInGoogle}>SignIn with Google</FormBtn>
        <TextFieldt type="text" ref={usernameSignUp} placeholder="Username"></TextFieldt>
        <TextFieldt type="email" ref={email} placeholder="Email"></TextFieldt>
        <TextFieldt type="password" ref={passwordSignUp} placeholder="Password"></TextFieldt>
        <FormBtn onClick={signUp}>Sign Up</FormBtn>
    </Formx>
    )
}

