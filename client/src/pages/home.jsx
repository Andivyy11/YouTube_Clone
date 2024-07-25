import VideoThumbnail from "../components/VideoThumbnail"
import styled from "styled-components"
import axios from 'axios'
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Container = styled.div`
   width:100%;
   height:calc(100% - 70px);
   display:flex;
   flex-wrap:wrap;
   justify-content:space-around;
   overflow-y:scroll;
`;

const Mssg =styled.div`
   text-align:center;
   margin-top:20px;
   font-size:20px;
`

export default function Home({type}) {
    const [videos, setVideos] = useState([])
    const [mssg ,setMssg] =useState("No Videos")
    const path = useLocation().pathname 

    useEffect(() => {
        async function fetchVideos() {
            let fetchedData;
            if(type === "trending")
            {
               fetchedData = await axios.get('video/trending');
            }
            else if(type === "subscription")
            {
               fetchedData = await axios.get('video/subscription')
               setMssg("No Subscriptions")
            }
            else if(type === "search")
            {
                setMssg("No match found")
                const i= path.lastIndexOf('/')
                fetchedData = await axios.get('/video/search/'+path.substring(i+1))
            }
            else 
            {
               fetchedData = await axios.get('video/random')
            }
            setVideos(fetchedData.data)
        }
        fetchVideos()
    }, [type])
    return (
        <Container>
            {
                videos.length === 0 ? <Mssg>{mssg}</Mssg> : 
                videos.map((v) => <VideoThumbnail key={v._id} vid={v} />)
            }
        </Container>
    )
}

