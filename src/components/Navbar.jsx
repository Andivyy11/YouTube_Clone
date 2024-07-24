import { useRef , useState} from 'react'
import styled from 'styled-components'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import {Link, useNavigate} from 'react-router-dom'
import { useSelector} from 'react-redux'
import { VideoCallOutlined } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/userSlice'
import UserProfile from './userProfile';

const NavBox = styled.div`
    width:100%;
    height:70px;
    display:flex;
    align-items:center;
    justify-content:center;
    background-color:${({theme}) => theme.sideBg};
    `

const SearchBox =styled.div`
    display:flex;
    width:40%;  
`

const InputBox =styled.input`
    background-color:transparent;
    width:100%;
    padding:10px 0 10px 18px;
    font-size:18px;
    border-width:2px 0 2px 2px;
    border-style:solid;
    border-color: ${({theme}) => theme.mainText};
    border-radius: 30px 0 0 30px;
    color: ${({theme}) => theme.mainText};
    &:focus{
        outline:none;
    }
`

const SearchBtn =styled.button`
    background-color:transparent;
    width:60px;
    border:2px solid white;
    border-radius: 0 30px 30px 0;
    border-color: ${({theme}) => theme.mainText};
    color: ${({theme}) => theme.mainText};

`

const Btn = styled.button`
border: 2px solid #3c99f1;
background-color:transparent;
padding:4px 12px;
color:#3c99f1;
display:flex;
align-items:center;
gap:8px;
cursor:pointer;
position:absolute;
right:20px;
top:20px;
`
const User = styled.div`
display:flex;
align-items:center;
position:absolute;
top:18px;
right:20px;
gap:15px;
`
const UserOptions =styled.div`
position:relative;

`
const Profile = styled.div`
`
const Avatar = styled.img`
height:45px;
width:45px;
border-radius:50%;
border:1px solid white;
object-fit:cover;
cursor:pointer;
`
const AccountMenu =styled.div`
position:absolute;
height: 600px;
top:100%;
right:10px;
width:300px;
border-radius:20px;
padding:20px 10px;
background-color: ${({theme}) => theme.sidebarBg};
display: ${({ $visible }) => ($visible ? 'block' : 'none')};  
overflow-y:scroll;
z-index:10
`
const Wrap =styled.div`
  display:flex;
  flex-direction:row;
  justify-content:center;
  gap:16px;
`
const Wrap2 = styled.div`

`
const AccountInfo = styled.span`
  display: flex;
  flex-direction:column;
  gap:9px;
`
const AccName = styled.span`
  font-size:18px;  
`
const AccEmail = styled.span`
  font-size:22px;
`
const Item = styled.div`
padding:10px 20px;
cursor:pointer;
border-radius:15px;
&:hover{
        background-color:#80808036;
}
`
const Line = styled.hr`
    width:90%;
    border:0.6px solid;
    border-color: ${({theme}) => theme.tint};
    margin:10px;
`
const UploadBtn = styled.span`
   color:${({theme})=> theme.mainText};
`
const MyChannel = styled.span``

export default function Navbar()
{
    const { currentuser }  = useSelector((state) => state.user)
    const searchText = useRef();
    const dispatch = useDispatch()
    const [menuVisible ,setVisible] = useState(false)

    const navigate = useNavigate()
    const handleSignOut = () =>{
        dispatch(logout());
    }

    return (
        <NavBox>
          <SearchBox>
            <InputBox placeholder='Search' ref={searchText}></InputBox>
            <SearchBtn onClick={()=> navigate('/search/'+searchText.current.value)}><SearchOutlinedIcon/></SearchBtn>
          </SearchBox>
          { currentuser ? (<User>
            <Link to='/upload'>
            <UploadBtn>
              <VideoCallOutlined style={{fontSize:"35px"}}/>
            </UploadBtn>
            </Link>
            <UserOptions>
                <Profile onClick={() => { 
                            if(menuVisible) 
                            { 
                              setVisible(false)
                            }
                            else 
                            { 
                              setVisible(true);
                            } }}>

{
                
                  currentuser.profile === undefined ?  <UserProfile name= {currentuser.name}/> : <Avatar src={currentuser.profile}/> 
                }
                </Profile>
                  <AccountMenu $visible={menuVisible}>
                    <Wrap>
                    {
                    currentuser.profile === undefined ? <UserProfile name={currentuser.name}/> :  <Avatar src={currentuser.profile} />
                    }
                    <AccountInfo>
                        <AccName>{currentuser.name}</AccName>
                        <AccEmail>{currentuser.email}</AccEmail>
                        <MyChannel onClick={()=> navigate('/MyChannel')}>View Your Channel</MyChannel>
                    </AccountInfo>
                    </Wrap>
                    <Line></Line>
                    <Wrap2>
                   <Item>Google Account</Item>
                   <Item onClick={()=> navigate('/login')}>Switch Account</Item>
                   <Item onClick={handleSignOut}>Sign Out</Item>
                   <Line></Line>
                   <Item>YouTube Studio</Item>
                   <Item>Purchases and membership</Item>
                   <Line></Line>
                   <Item>Language  English</Item>
                   <Item>Restricted mode off</Item>
                   <Item>Location India</Item>
                   <Line></Line>
                   <Item>Settings</Item>
                   <Item>Help</Item>
                   <Item>Feedback</Item>
                   </Wrap2>
                  </AccountMenu>
                </UserOptions>
                {currentuser.name}
                </User>)
                : <Link to="/login"><Btn><AccountCircleOutlinedIcon/>Sign In</Btn></Link>}
        </NavBox>
    )
}