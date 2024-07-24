import VideoThumbnail from "../components/VideoThumbnail"
import styled from "styled-components"
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Comment from "../components/Comment";
import { useEffect, useState,useRef } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { fetchStart, fetchSuccess, fetchfailure, like, dislike} from "../redux/videoSlice";
import { subscribe } from '../redux/userSlice'
import { useDispatch } from 'react-redux'
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import app from "../firebase"
import UserProfile from "../components/userProfile";
import { format } from "timeago.js";

const Container = styled.div`
   width:100%;
   height:calc(100% - 70px);
   padding-top:30px;
   display:flex;
   overflow-y:scroll;
`
const Main = styled.div`
   width:800px;
   display:flex;
   flex-direction:column;
   align-items:center;
`
const Recommendations = styled.div`
   
`
const VideoSection = styled.div`
   width:700px;
`
const Thumbnail = styled.div`
   width:100%;
   height:400px;
   background-color: ${({theme}) => theme.sidebarBg};
   border-radius:20px;
   box-shadow:1px 1px 2pc #525252;
   position:relative;
`
const VideoPlayer = styled.video`
   width:100%;
   height:100%;
`

const VideoSource = styled.source`

`
const Playbtn = styled.span`
position:absolute;
top:50%;
left:50%;
transform:translate(-50%,-50%);
z-index:3;
display: ${({$play}) => $play ? "none" : "block"};

`
const ThumbnailImg = styled.img`
   width:100%;
   height:100%;
   position:absolute;
   z-index:2;
   border-radius:20px;
   object-fit:cover;
   display: ${({$play}) => $play ? "none" : "block"};
`

const Wrapper = styled.div`
   width:100p%;
   padding:15px 0;
   display:flex;
   flex-direction:column;
   gap:20px;
`
const Wrap1 = styled.div`
   width:100%;
   display:flex;
   align-items:center;  
   justify-content:space-between;
   flex-wrap:wrap;
`
const Wrap2 = styled.div`
   background-color: ${({theme}) => theme.tint};
   border-radius:18px;
   padding:20px;
`
const Title = styled.h2`
`
const Channel = styled.div`
  display:flex;
  align-items:center;
  gap:14px;
`

const ChannelName = styled.h3`
  cursor:pointer;
`

const Options = styled.div`
display:flex;
gap:8px;
`
const VideoOptions = styled.button`
  background-color: ${({theme}) => theme.tint};
  color: ${({theme}) => theme.mainText};
  height:40px;
  padding:0 14px;
  border-radius:40px;
  border:none;
  display:flex;
  align-items:center;
  gap:7px;
  font-size:14px;
  font-weight:400;
  cursor:pointer;
`
const Subscribe = styled.button`
  background-color:red;
  color:white;
  height:40px;
  padding:0 18px;
  border-radius:40px;
  border:none;
  display:flex;
  align-items:center;
  font-size:16px;
  cursor:pointer;
`
const Icon =styled.span`
`

const Stats = styled.span`
   margin-right:18px; 
`
const Description =styled.p``

const CommentSection = styled.div`
   display:flex;
   width:90%;
   flex-direction:column;
`
const TypeComment = styled.div`
   width:100%;
   display:flex;
   height:60px;
   align-items:center;
   gap:15px;
`
const TypeBox = styled.input`
    width:100%;
    padding:10px 5px;
    background-color:transparent;
    outline:none;
    border-width:0 0 2px 0;
    border-color: ${({theme}) => theme.tint};
   color: ${({theme}) => theme.mainText};   
`
const PostComment = styled.button`
     background-color: ${({theme}) => theme.tint};
  color: ${({theme}) => theme.mainText};
  height:40px;
  padding:0 18px;
  border-radius:40px;
  border:none;
  font-size:16px;
  font-weight:600;
  cursor:pointer;
`
export default function Video() {

    const { currentuser } = useSelector( (state) => state.user)
    const { currentvideo } = useSelector( (state) => state.video)
    const dispatch = useDispatch()

    const [recom , setRecom] = useState([])
    const [comments , setComments] = useState([])
    const [uploader , setUploader] = useState()
    const [editId , setEdit] = useState(null)
    const commentText = useRef();

    const [imgUrl , setImg] = useState("")
    const [vidUrl , setVideo] = useState("")
    const storage = getStorage(app);
    const [play , setPlay ] = useState(false)
    const videoRef = useRef();


    const path=useLocation().pathname
    const vid= path.substring(7)

    useEffect(()=>{
        dispatch(fetchStart())
        setImg("")
        setVideo("")
        const fetchVideo = async () => {
                try {
                    const v = await axios.get('/video/getVideo/' + vid);
                    const u = await axios.get('/user/' + v.data.userId);
                    setUploader(u.data);
                    dispatch(fetchSuccess(v.data));

                    const thumbnailURL = await getDownloadURL(ref(storage, v.data.thumbnail));
                    setImg(thumbnailURL);

                    const vUrl = await getDownloadURL(ref(storage, v.data.videoUrl ));
                    setVideo(vUrl)

                } 
                catch (error) {
                    console.error('Error fetching data', error);
                    dispatch(fetchfailure(error));
                  }
                const comm = await axios.get(`/comment/${vid}`)
                setComments(comm.data)
        }
        fetchVideo()
        },[vid])

    useEffect(()=>{
        const fetchRecommendation = async () =>{
            const fetchData = await axios.get('/video/trending')
            setRecom(fetchData.data)
        }
        fetchRecommendation();
    },[vid])

    const likeVideo = async () => {
        try{
            await axios.put('/user/like/'+vid)
            dispatch(like(currentuser._id))
        }
        catch(err)
        {
            console.log(err)
        }
    }
    const dislikeVideo = async () => {
        try{
            await axios.put('/user/dislike/'+vid)
            dispatch(dislike(currentuser._id))
        }
        catch(err)
        {
            console.log(err)
        }
    }
    const handleSubscription = async () => {
        try{
        if(!currentuser.subscribed.includes(uploader?._id))
        {
            await axios.put('/user/subscribe/'+uploader?._id)
            dispatch(subscribe(currentvideo.userId))
        }
        else 
        {
            await axios.put('/user/unsubscribe/'+uploader?._id)
            dispatch(subscribe(currentvideo.userId))
        }
        }
        catch(err)
        {
            console.log(err)
        }
    }
    const postComment = async () =>{
        try{
            if(editId)
            {
                await axios.put(`/comment/${editId}` , { "text": commentText.current.value})
                setEdit(null)
            }
            else    
                await axios.post('/comment' , {videoId :vid , text:commentText.current.value})
           
            const c=await axios.get(`/comment/${vid}`)
            setComments(c.data)
            commentText.current.value = "" 
        }
        catch(err)
        {
            console.log(err)
        }
    }
    const handleEdit = async (cId) =>{
           const index = comments.findIndex((doc) => doc._id === cId)
           commentText.current.value = comments[index].text
           setEdit(cId)
    }
    const handleDelete = async (cId) =>{
        try{
            await axios.delete(`/comment/${cId}`) 
            setComments(comments.filter((c) => c._id !== cId))
        }
        catch(err)
        {
           console.log(err)
        }
    }
    async function handlePlay (){
       try{
          await axios.put('/video/view/'+vid)
            videoRef.current.load()
            videoRef.current.play()
           
       }
       catch(err)
       {
        console.log(err)
       }
    }

    return (
        <Container>
            <Main>
                <VideoSection>
                    <Thumbnail>
                      {imgUrl !== "" && <ThumbnailImg src={imgUrl} alt="video" $play={play}/>}
                      <VideoPlayer controls ref={videoRef} onEnded={()=> setPlay(false)}>
                        <VideoSource src={vidUrl} type="video/mp4"/>
                      </VideoPlayer>
                      <Playbtn $play={play}>
                        <PlayArrowIcon style={{fontSize:"60px",color:"red"}} onClick={() => { setPlay(true); handlePlay()}}/>
                      </Playbtn>
                    </Thumbnail>
                    <Wrapper>
                        <Title>{currentvideo?.title}</Title>
                        <Wrap1>
                            <Channel>
                                 <UserProfile name={uploader?.name}/>
                                <ChannelName>{uploader?.name}</ChannelName>
                                <Subscribe onClick={handleSubscription}>{ currentuser?.subscribed.includes(currentvideo?.userId) ? "Unsubscribe" : "Subscribe" }</Subscribe>
                            </Channel>
                            <Options>
                                <VideoOptions><Icon onClick={likeVideo}>{ currentvideo?.likes.includes(currentuser?._id) ? <ThumbUpIcon/> : <ThumbUpOffAltIcon/>}</Icon> {currentvideo?.likes.length} | <Icon onClick={dislikeVideo}>{ currentvideo?.dislikes.includes(currentuser?._id) ? <ThumbDownIcon/> : <ThumbDownOffAltIcon/> } </Icon></VideoOptions>
                                <VideoOptions><Icon><ShareOutlinedIcon/></Icon>Share</VideoOptions>
                                <VideoOptions><Icon><MoreHorizIcon/></Icon>More</VideoOptions>
                            </Options>
                        </Wrap1>
                        <Wrap2>
                            <Stats>{currentvideo?.views} Views</Stats>
                            <Stats>{format(currentvideo?.createdAt)}</Stats>
                            <Description>{currentvideo?.desc}</Description>
                        </Wrap2>
                    </Wrapper>
                </VideoSection>
                <CommentSection>
                    <Title>Comments</Title>
                    <TypeComment>
                        <UserProfile name={currentuser.name}/>
                        <TypeBox ref={commentText} placeholder="Type a comment "></TypeBox>
                        <PostComment onClick={() => postComment()}>Comment</PostComment>
                    </TypeComment>
                    {
                        comments.map((c) => <Comment data={c} key={c._id} deleteComm={() => handleDelete(c._id)} editComm={()=>handleEdit(c._id)}></Comment>)
                    }
                </CommentSection>
            </Main>
            <Recommendations>
               {
                 recom!== undefined && recom.map((v) => <VideoThumbnail key={v._id} vid={v} type="sm"/>)
               }
            </Recommendations>
        </Container>
)
 }

