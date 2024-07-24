import { useEffect, useState } from "react"
import styled from "styled-components"
import {  getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../firebase";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
width:100%;
height:calc(100% - 70px);
overflow-y:scroll;
display:flex;
flex-direction:column;
align-items:center;
padding:20px 0;
`
const Title = styled.h1`
    color:${({theme}) => theme.sidebarText};
    margin:30px 0;
`
const Labell = styled.p`
    font-size:20px;
    margin:10px 0;
    color:${({theme}) => theme.sidebarText};
    `

const Input = styled.input`
      width:100%;
      background-color:transparent;
      border:2px solid;
      border-color:${({theme}) => theme.tint};
      color:${({theme}) => theme.mainText};
      font-size:17px;
      padding:8px 5px;`

const Desc = styled.textarea`
    background-color:transparent;
    border-color:${({theme}) => theme.tint};
    width:100%;
    height:100px;
    resize:none;`

const Button = styled.button`
    font-size:20px;
    padding:5px 10px;
    background-color:white;
    margin-top:15px;
    border-radius:8px;
    border:none;`

const Form = styled.form`
    width:340px;
    padding:20px;
    background-color:${({theme}) => theme.sidebarBg};
    border-radius:10px;`

const Percen = styled.span`   
`
export default function Upload()
{
    const [input, setInput] = useState({})
    const [video , setVideo] = useState("")
    const [image , setImg] = useState("")
    const [tags , setTags] = useState([])

    const navigate = useNavigate()
    const handleTags = (e) => {
        setTags(e.target.value.split(","))
        setInput( prev => { return { ...prev , [tags]:  tags}})
    }

    const handlChange = (e)=>{
        setInput( prev => { return {...prev , [e.target.name] : e.target.value} })
    }

    const uploadFile = (file, urlType) => {

        setInput((prev) => {
                return { ...prev, [urlType] : file.name  };})
        const storage = getStorage(app);
        const storageRef = ref(storage, file.name);
        const uploadTask = uploadBytesResumable(storageRef, file);
    
        uploadTask.on(
          "state_changed",
          (error) => {},
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setInput((prev) => {
                return { ...prev, [urlType]: downloadURL };
              });
            });
          }
        );
      };
    
      useEffect(() => {
        video && uploadFile(video , "videoUrl");
      }, [video]);
    
      useEffect(() => {
        image && uploadFile(image, "thumbnail");
      }, [image]);

     const uploadVideo = async (e) =>{
        e.preventDefault();
        const res = await axios.post("/video/upload", input)
        res.status == 200 && navigate('/video/'+res.data._id)
     }

    return <Container> 
        <Title>Upload Video</Title>
        <Form>
            <Labell>Video</Labell>
            <Input type='file' accept='video/*' name="videoUrl" onChange={(e) => setVideo(e.target.files[0])}></Input>
            <Labell>Video Title</Labell>
            <Input type='text' name="title" onChange={handlChange}></Input>
            <Labell>Video Description</Labell>
            <Desc name="desc" onChange={handlChange}></Desc>
            <Labell>Thumbnail</Labell>
            <Input type='file' accept='images/*' name="thumbnail" onChange={(e) => setImg(e.target.files[0])}></Input>
            <Labell>Tags</Labell>
            <Input name="tags" onChange={(e)=> handleTags(e)}></Input>
            <Button onClick = {uploadVideo}>Upload</Button>
        </Form>
    </Container>
}

