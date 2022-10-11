import { useContext } from "react";
import { DevContext } from "./DevContext";
import Hours from "./Hour";
import styled from "styled-components";
import Appoinment from "./Appointment";

const Calendar = () => {
  const { loggedUser } = useContext(DevContext);

  // loggedUser.appointments
  // map it and render them

  // render sessions for studnets
  // const getSession = () => {
  //   return loggedUser.appointments.map((session) => {
  //     console.log("session log", session);
  //     return { days: Object.keys(session), hours: Object.values(session) };
  //   });
  // };

  // render sessions for devs
  // const getSessionsDev = () => {
  //   return Object.keys(loggedUser.availability);
  // };


  return loggedUser.appointments.map((appointment)=>{
    return <Appoinment appointment={appointment} role={loggedUser.role}/>
  })
  





//   if (loggedUser.role === "developer") {
//     console.log(loggedUser);
//     return (
// <Map>
//       <>
//         <UserInfo>
//             <ImgUser src={loggedUser.picture} />
//           <Name>

//             <div>NAME: {loggedUser.nickname} </div>
//             <div>ABOUT ME: {loggedUser.bio}</div>
//             <div>MY LANGUAGES: {loggedUser.languages}</div>
//           </Name>
//         </UserInfo>
//         <Project>PAST PROJECT<br/>🡇🡇🡇</Project>
//           <ImgProject src={loggedUser.url} />
//         {getSessionsDev().map((day, index) => {
//           return (
//             <>
//             <UserBookingInfo>

//               <p>{day}</p>
//               <p>
//                 {loggedUser.availability[day].map((hour) => (
//                   <p>{hour}</p>
//                   ))}
//               </p>
//         </UserBookingInfo>
//             </>
//           );
//         })}
//       </>
//                   </Map>
//     );
//   } else {
    
//     return (

//       <New>
//       {getSession()[0].days.map((day, index) => {
//         return (
//           <New2>
//           <White>{day}:</White>
//           <p>{getSession()[0].hours[index]}</p>
//           </New2>
//           );
//         })}
//         </New>
   
//         );
//       }
    };
    
//     const UserInfo = styled.div`
//   /* border: solid black; */
//   display: flex;
//   height: 3.5%;
//   `;
// const Name = styled.div`
// color: white;
// height: 100%;
// width: 100%;
// margin-left: 10px;
// display: flex;
// flex-direction: column;
// justify-content: center;
// font-family:ARIAL BLACK;

// `;
// const ImgUser = styled.img`
//   background-color: red;
//   width: 18%;
//   border-radius: 25%;
//   height: 90%;
//   width: 15%;
// `;
// const Project = styled.div`
// font-family:ARIAL BLACK;
// font-size: 20px;
// color: #fff;
// margin-left: 160px;

// `;
//  const ImgProject = styled.img`
//  height: 80%;
//  width: 100%;
//  `;
//   const Map = styled.div`
//   border: solid black;
//   border-radius: 10px;
//   display: flex;
// display: flex;
// flex-wrap: wrap;
// `;
// const UserBookingInfo = styled.div`
// color: white;
//   border: solid black;
//   border-radius: 10px;
//   display: flex;
// margin-left: 1px;
//   width: 14%;
//   font-family:ARIAL BLACK;
// font-size: 12px;
//   `;
//    const New = styled.div`
//   width:100%;
//   height: 100%;
//    display: flex;
//    flex-direction: column;
//    flex-wrap: wrap;
//    /* align-items: center; */
//    line-height: 5px;
  
//    `;
//     const New2 = styled.div`
//     /* border: solid black; */
//   padding-top: 10px;
//     border-radius:10px;
//     width: fit-content;
//     color:  #00be67;
//     font-family:ARIAL BLACK;
// margin: auto;
//     `;
//     const White = styled.div`
//     /* border: solid black; */
//     border-radius:10px;
//     width: fit-content;
//     color:  #fff;
//     font-family:ARIAL BLACK;
// margin: auto;
//     `;
export default Calendar;
