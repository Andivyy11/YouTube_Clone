import react from 'react'
import styled from 'styled-components'
import logoImg from '../Images/Youtube_logo.png'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import SubscriptionsOutlinedIcon from '@mui/icons-material/SubscriptionsOutlined';
import WhatshotOutlinedIcon from '@mui/icons-material/WhatshotOutlined';
import SportsBaseballOutlinedIcon from '@mui/icons-material/SportsBaseballOutlined';
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';
import MovieCreationOutlinedIcon from '@mui/icons-material/MovieCreationOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import MusicNoteOutlinedIcon from '@mui/icons-material/MusicNoteOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import VideoLibraryOutlinedIcon from '@mui/icons-material/VideoLibraryOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import LiveTvOutlinedIcon from '@mui/icons-material/LiveTvOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import ContrastOutlinedIcon from '@mui/icons-material/ContrastOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const MenuBox = styled.div`
       background-color: ${({theme})=>theme.sidebarBg };
       height:100%;
       width:300px;
       overflow-y:scroll;
       `

    const Logo = styled.div`
        display:flex;
        align-items:center;
        gap:5px;
        width:100%;
        height:70px;
        `
    const LogoImg = styled.img`
        height:30px;
        margin-left:10px;
       `
    const LogoText = styled.h2`
       color: ${({theme}) => theme.sidebarText};
       `
    const Items = styled.ul`
        width:100%;
        padding:18px;
        list-style-type:none;
        `
    const Item = styled.li`
        padding:8px;
        margin:5px;
        border-radius:15px;
        display:flex;
        align-items:center;
        gap:10px;
       color: ${({theme}) => theme.sidebarText};
        cursor:pointer;
        &:hover{
        background-color:#80808036;
        }
       `
    const Hr = styled.hr`
        width:90%;
        border:0.6px solid;
        border-color: ${({theme}) => theme.tint};
        `
    const Mssg = styled.div`
        padding:25px;
        width:100%;
    `
    const SignInText = styled.p`
        font-size:15px;
        line-height:1.5;   
    `
    const SignInBtn = styled.button`
        border: 2px solid #3c99f1;
        font-size:14px;
        background-color:transparent;
        padding:4px 12px;
        color:#3c99f1;
        margin-top:18px;
        display:flex;
        cursor:pointer;
        align-items:center;
        gap:8px;
        `

    const Heading = styled.h3`
      margin:16px 0 0 18px;
      color: ${({theme}) => theme.sidebarText};
    `
export default function Menu({setDarkMode})
{
    const { currentuser} = useSelector(state => state.user)
    return (
        <MenuBox>
            <Link to="/">
            <Logo>
                <LogoImg src={logoImg} alt="youtube_logo"></LogoImg>
                <LogoText>YouTube</LogoText>
            </Logo>
            </Link>
            <Items>
                <Link to="/"><Item><HomeOutlinedIcon/>Home</Item></Link>
                <Link to="/trending"><Item><ExploreOutlinedIcon/>Explore</Item></Link>
                <Link to="/subscription"><Item><SubscriptionsOutlinedIcon/>Subscription</Item></Link>
            </Items>
            <Hr/>
            <Items>
                <Item><VideoLibraryOutlinedIcon/>Library</Item>
                <Item><HistoryOutlinedIcon/>History</Item>
            </Items>
            <Hr/>
            { !currentuser &&
            <Mssg>
                <SignInText>Sign In to like, subscribe, comment and share Videos </SignInText>
                <Link to="/login"><SignInBtn><AccountCircleOutlinedIcon/>Sign In</SignInBtn></Link>
            </Mssg>
            }
            <Hr/>
            <Heading>Explore</Heading>
            <Items>
                <Item><WhatshotOutlinedIcon/>Trending</Item>
                <Item><ShoppingBagOutlinedIcon/>Shopping</Item>
                <Item><MusicNoteOutlinedIcon/>Music</Item>
                <Item><SportsBaseballOutlinedIcon/>Sports</Item>
                <Item><SportsEsportsOutlinedIcon/>Gaming</Item>
                <Item><MovieCreationOutlinedIcon/>Movies</Item>
                <Item><ArticleOutlinedIcon/>News</Item>
                <Item><LiveTvOutlinedIcon/>Live</Item>
            </Items>
            <Hr/>
            <Items>
                <Item><SettingsOutlinedIcon/>Settings</Item>
                <Item><FlagOutlinedIcon/>Report</Item>
                <Item><HelpOutlineOutlinedIcon/>Help</Item>
                <Item onClick={()=> setDarkMode((prev) => !prev)}><ContrastOutlinedIcon/>Color Theme</Item>
            </Items>
        </MenuBox>
    )
}