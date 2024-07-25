import styled from "styled-components"
import { useEffect, useState } from "react"
import axios from 'axios'
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import app from "../firebase"
import { format } from "timeago.js"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import UserProfile from "./userProfile";
import { useNavigate } from "react-router-dom";


const Container = styled.div` 
   width:${(props)=> props.type === "sm" ? "380px" : "340px"};
   height:${(props)=> props.type === "sm" ? "130px" : "320px"};
   margin:16px;
   display : ${(props) => props.type==="sm" && "flex"};
   align-items:${(props) => props.type === "sm" && "center"};
   color: ${({theme}) => theme.mainText}; 
`
const Thumbnail = styled.div`
  width:${(props) => props.type === "sm" ? "190px" : "340px" };
  height: ${(props)=> props.type === "sm" ? "130px" : "240px"};
  background-color: ${({theme})=>theme.sidebarBg };
  border-radius:18px;
`
const ThumbnailImg =styled.img`
width:100%;
height:100%;
  border-radius:18px;
  object-fit:cover;
`
const Wrapper = styled.div`
  padding:10px;
  display:flex;
  flex:1;
`
const VideoInfo =styled.div`
  margin-left:20px;
`
const Title = styled.p`
  font-size: ${(props)=> props.type !== "sm" ? "18px" : "15px" };
  font-weight:700;  
`
const Uploader = styled.img`
  width:35px;
  height:35px;
  border-radius:50%; 
  object-fit:cover;
`
const ChannelName = styled.p`
   margin:4px 0;  
`;
const Stats = styled.span`
  font-size: ${(props) => props.type === "sm" ? "12px" : "14px"};
   margin-right:10px;
`;

const More=styled.div`
cursor:pointer;
position:relative;
`

const Opt = styled.div`
&:hover{
    color:${({theme}) => theme.sidebarText}
}
`
const Options = styled.div` 
display:${({ $isopen })=> $isopen ? "block" : "none"};
background-color:${({theme})=> theme.tint};
position:absolute;
padding:10px 8px;
border-radius:10px;
`
const OuterWrap =styled.div`
display:flex;
flex-direction:column;
align-items:flex-end;
`
export default function VideoThumbnail({type , vid , deleteVid})
{   
    const [uploader , setUploader] = useState()
    const [imgUrl , setImg] = useState("")
    const [isOpen , setToggle] = useState(false)
    const storage = getStorage(app);
    const navigate= useNavigate()

    getDownloadURL(ref(storage, vid.thumbnail))
    .then((u) => {
      setImg(u)
    })
    .catch((error) => {
      console.log(error)
    });


    useEffect( ()=>{
      const getUploader = async () =>{
        const fetchUser = await axios.get(`/user/${vid.userId}`)
        setUploader(fetchUser.data)
      }
      getUploader();
    } , [vid._id])

    return (
   <OuterWrap>
       {
        type ==="ch" && <More> 
          <MoreVertIcon onClick={()=> setToggle(prev => !prev)}/>
            <Options $isopen={isOpen}>
              <Opt onClick={() => deleteVid(vid._id)} >Delete</Opt>
            </Options>
          </More>
        } 
        <Container type={type} onClick={()=> navigate('/video/'+vid._id)}>
            <Thumbnail type={type}>
              <ThumbnailImg src={imgUrl} alt="thumbnail"/>
            </Thumbnail>
            <Wrapper type={type}>
               { type !== "sm" && (uploader?.profile === undefined ? <UserProfile name={uploader?.name} type="thumbnail"/> : <Uploader src={uploader?.profile}/> ) }
                <VideoInfo>
                <Title>{vid.title}</Title>
                <ChannelName>{uploader?.name}</ChannelName>
                <Stats>{vid.views} Views</Stats>
                <Stats>{format(vid.createdAt)}</Stats>
                </VideoInfo>
            </Wrapper>
        </Container> 
      </OuterWrap>
      )
}


      
