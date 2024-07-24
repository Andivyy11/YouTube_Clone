import styled, { ThemeProvider } from 'styled-components'
import Menu from './components/Menu'
import Navbar from './components/Navbar'
import React from 'react'
import { darkTheme , lightTheme} from './utils/theme'
import { BrowserRouter as Router , Routes , Route} from 'react-router-dom'
import Home from './pages/home.jsx';
import Video from './pages/video.jsx';
import Form from './pages/signUpForm.jsx'
import Channel from './pages/Channel.jsx'
import Upload from './pages/upload.jsx'

const Container = styled.div`
    width:100vw;
    height:100vh;
    display:flex;
    overflow-x:hidden;
    `

const Main = styled.div`
    width: calc(100% - 300px );
    height:100vh;
    background-color:${({theme})=> theme.mainBg};
    color: ${({theme}) => theme.mainText};
    ` 
function App() 
{
  const [darkMode,setDarkMode] = React.useState(true)
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Container>
        <Router>
        <Menu setDarkMode={setDarkMode}/>
        <Main>
          <Navbar/>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/trending" element={<Home type="trending"/>} />
            <Route path="/subscription" element={<Home type="subscription"/>} />
            <Route path="/search/:query" element={<Home type="search"/>} />
            <Route path='/video/:id' element={ <Video/>} />
            <Route path='/login' element={<Form />} />
            <Route path='/MyChannel' element={<Channel/>} />
            <Route path='/upload' element={<Upload/>} />
          </Routes>
        </Main>
        </Router>
      </Container>
    </ThemeProvider>
  )
}

export default App;
  