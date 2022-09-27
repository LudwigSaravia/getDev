import styled from "styled-components";

import tombstone from "../assets/tombstone.png";

const Confirmation = () => {
  const reservation = JSON.parse(localStorage.getItem("reservation"))
 
  return (
    <>
      <Wrapper>Confirmation page</Wrapper>
  
     {reservation&& <div>
        <p>Reservation#:{reservation.id} </p>
        <p>Flight:{reservation.flight} </p>
        <p>Seat:{reservation.seat} </p>
        <p>Name:{reservation.givenName} {reservation.surname}</p>
        <p>Email:{reservation.email} </p>
      </div>}
      <img src={tombstone} alt="" />
    </>
  );
};

const Wrapper = styled.div``;

export default Confirmation;
