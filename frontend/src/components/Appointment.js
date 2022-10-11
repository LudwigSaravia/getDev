import styled from "styled-components";


const Appoinment = ({appointment, role}) => {
  console.log("new log", appointment)
    return <Div>
    

    <p>{appointment.day}</p>
    <p>{appointment.time}</p>
    <p>{role === "student" ? appointment.devEmail : appointment.nonDevEmail}</p>
    
    </Div>
  };

  const Div = styled.div`
  color: white;
  `;
  export default Appoinment


//   <New>
// //       {getSession()[0].days.map((day, index) => {
//         return (
//           <New2>
//           <White>{day}:</White>
//           <p>{getSession()[0].hours[index]}</p>
//           </New2>
//           );
//         })}
//         </New>

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