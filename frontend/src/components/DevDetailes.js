import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import days from "../consts/days";
import { DevContext } from "./DevContext";
import hours from "../consts/hours";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";


const DevDetails = () => {
  const [dev, setDev] = useState();
  const devId = useParams().devId;

  const { loggedUser, updateUser } = useContext(DevContext);
  const { user } = useAuth0();

  if (dev) {
    const availabilityArray = dev.availability;
    console.log("availabilityArray", availabilityArray);
    console.log("days", days);
  }
  
  const makeAvailable = (email, day, hour) => {
    // "/api/add-availability"

    fetch("/api/add-availability", {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, day, time: hour }),
    });
  };
 












  const regrabbingInfo = () => {
    fetch(`/api/getDev/${devId}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.data)
      setDev(data.data);
    });
  }


  const makeAppointment = (email, day, hour) => {
    fetch("/api/add-appointment", {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nonDevEmail:email, devEmail:dev.email, day, time: hour }),
    })
      .then((res) => res.json())
      .then((data) => {
        updateUser(loggedUser.email);
        regrabbingInfo()
        if (data.status == 200) {
          window.alert("your session is booked");
        }
      });
  };
  useEffect(() => {
regrabbingInfo()
  }, [devId]);

  if (!dev) {
    return <div>Loading ....</div>;
  }

  return (
    <>
      <BookASession>BOOK A SESSION!</BookASession>
    <Body>

 
      {days.map((day) => {
        return (
          <Wrapper>
            <p>{day}</p>
            {hours.map((hour) => {
              const isAvailable = dev.availability[day].includes(hour);
              return !isAvailable ? (
                <p key={hour}>{hour}:00 is unavailable</p>
                ) : (
                  <div key={hour}>
                  <p>{hour}:00 is available</p>
                  <button
                    onClick={() => {
                      makeAvailable(dev.email, day, hour); //adds session to dev object in mongo
                      makeAppointment(user.email, day, hour); // adds session to student object in mongo
                    }}
                    >
                    Book
                  </button>
                </div>
              );
            })}
          </Wrapper>
        );
      })}
      </Body>
    </>
  );
};

const BookASession = styled.div`
color: #00be67;
font-family:ARIAL BLACK;

width: 21%;
`;
const Wrapper = styled.div`
font-family:ARIAL BLACK;

 color: white;
border: solid black;
width: 20%;
`;

const Body = styled.div`
 color: whiter;
display: flex;
flex-wrap: wrap;
color: white;
`;
const Img1 = styled.img`
 color: whiter;
border: solid black;
width: 20%;
height: 20%;
`;



export default DevDetails;
