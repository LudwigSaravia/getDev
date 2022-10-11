import { useContext } from "react";
import { DevContext } from "./DevContext";
import styled from "styled-components";

const UserInformation = () => {

  const { loggedUser } = useContext(DevContext);



return(

    <Map>
     
            <UserInfo>
                <ImgUser src={loggedUser.picture} />
              <Name>

                  <div>NAME: {loggedUser.nickname} </div>
                  <div>ABOUT ME: {loggedUser.bio}</div>
                  <div>MY LANGUAGES: {loggedUser.languages}</div>
                </Name>
            </UserInfo>
            <Project>PAST PROJECT<br/>🡇🡇🡇</Project>
             <ImgProject src={loggedUser.url} />
       
            
          
        
      
    </Map>
)
      
}


const UserInfo = styled.div`
/* border: solid black; */
display: flex;
height: 3.5%;
`;
const Name = styled.div`
color: white;
height: 100%;
width: 100%;
margin-left: 10px;
display: flex;
flex-direction: column;
justify-content: center;
font-family:ARIAL BLACK;

`;
const ImgUser = styled.img`
background-color: red;
width: 18%;
border-radius: 25%;
height: 90%;
width: 15%;
`;
const Project = styled.div`
font-family:ARIAL BLACK;
font-size: 20px;
color: #fff;
margin-left: 160px;

`;
const ImgProject = styled.img`
height: 80%;
width: 100%;
`;
const Map = styled.div`
border: solid black;
border-radius: 10px;
display: flex;
display: flex;
flex-wrap: wrap;
`;
const UserBookingInfo = styled.div`
color: white;
border: solid black;
border-radius: 10px;
display: flex;
margin-left: 1px;
width: 14%;
font-family:ARIAL BLACK;
font-size: 12px;
`;

 export default UserInformation;