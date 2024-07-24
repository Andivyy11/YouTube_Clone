import styled from "styled-components"

const Container = styled.div`
    background-color:white;
    width:${({type}) => type === "thumbnail" ? "35px" : ( type === "commentPage" ? "28px" : "50px") };
  height:${({type}) => type === "thumbnail" ? "35px" :  ( type === "commentPage" ? "28px" : "50px")};
  display:flex;
  justify-content:center;
  align-items:center;
  border-radius:50%;
  cursor:pointer;
`
const Letter = styled.span`
   font-size: 20px;
   font-weight:600;
   color:black;
`
export default function UserProfile(props){
    return (
        <Container type={props.type}>
            <Letter>
                {props.name!== undefined && props.name.substring(0,1).toUpperCase()}
            </Letter>
        </Container>
    )
}