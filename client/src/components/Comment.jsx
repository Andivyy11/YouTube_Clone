import styled from 'styled-components'
import { useEffect , useState} from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import UserProfile from './userProfile'
import { format } from 'timeago.js'

const Container = styled.div`
      padding:20px;
      display:flex;
      gap:20px;
`
const Wrapper = styled.div`
      display:flex;
      flex-direction:column;
      width:100%;
      gap:10px;
`
const Top = styled.div`
      display:flex;
      width:100%;
`
const Bottom =styled.p``
const Profile = styled.img`
   width:40px;
   height:40px;
   border-radius:50%;
   object-fit:cover;
`
const UserName = styled.span`
    font-size:17px;
    font-weight:600; 
    margin-right:20px;
`
const Time = styled.span`
    font-size:12px;
`
const TopRight = styled.div`
    position:relative;
cursor:pointer;
`
const Options = styled.div`
    display:none;
    position:absolute;
    left:100%;
    top:-30%;
    border-radius:10px;
    padding:8px 12px;
    background-color: ${({theme}) => theme.tint};
    ${TopRight}:hover &{
        display:block;
    }
`

const OptionBtn = styled.button`
color: ${({theme}) => theme.mainText};
background : transparent;
border:0;
font-size:16px;
&:hover{
   color: ${({theme}) => theme.sidebarText};
}
`
const Avatar = styled.div`
`
export default function Comment({data , deleteComm , editComm})
{
    const {currentuser} = useSelector( (state) => state.user)
    
    const [commenter,setCommenter]=useState()
    useEffect(()=>{
        const fetch = async () =>{
            const u=await axios.get(`/user/${data.userId}`)
            setCommenter(u.data)
        }
        fetch();
    },[])

    return <Container>
        <Avatar>
            {
                commenter?.profile === undefined ? <UserProfile name={commenter?.name} type="commentPage"/> : <Profile src={commenter?.profile} />
            }
        </Avatar>
        <Wrapper>
            <Top>
                <UserName>{commenter?.name}</UserName>
                <Time>{ format(data.createdAt) }</Time>
                {
                 currentuser._id === data.userId &&
                (<TopRight><MoreVertIcon/>
                    <Options>
                        <OptionBtn onClick={editComm}>Edit</OptionBtn>
                        <OptionBtn onClick={deleteComm}>Delete</OptionBtn>
                    </Options>
                </TopRight> )
                }
            </Top>
            <Bottom>
               {data.text}
            </Bottom>
        </Wrapper>
    </Container>
}