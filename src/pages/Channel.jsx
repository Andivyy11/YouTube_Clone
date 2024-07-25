import styled from "styled-components";
import axios from 'axios'
import { useEffect, useState} from "react";
import { useSelector} from 'react-redux'
import VideoThumbnail from "../components/VideoThumbnail";

const Container = styled.div`
height:calc(100% - 70px);
width:100%;
overflow-y:scroll;
`
const Title = styled.h2`
margin:20px;
`
const Videos = styled.div`
display:flex;
flex-wrap:wrap;
justify-content:center;
gap:10px;
`
const Wrap = styled.div`
padding:5px;
display:flex;
flex-direction:column;
align-items:flex-end;
`
export default function Channel()
{    
    const { currentuser }  = useSelector((state) => state.user)
    const [videos , setVideos] = useState([])

    useEffect(()=>{
       const fetchVideos = async () =>{
            const vds=await axios.get('/video/userVideos/'+currentuser._id)
            setVideos(vds.data)
       }
       fetchVideos();
    },[])

    const handleDelete = async (i) =>{
        console.log('vid id in delete function ',i)
        await axios.delete('/video/delete/'+i)
        setVideos( videos.filter(v => {
           return v._id !== i
        }))
    } 
    return ( 
    <Container>
        <Title>My Videos</Title>
        <Videos>
            { 
                videos.length === 0 ? "No Videos Posted" : videos.map((v) => 
                    <VideoThumbnail key={v._id} vid={v} type="ch" deleteVid={handleDelete}/>)
            }
        </Videos>
    </Container>
    )
}