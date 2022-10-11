import { useContext } from "react";
import { DevContext } from "./DevContext";
import Hours from "./Hour";
import styled from "styled-components";
import Appoinment from "./Appointment";

const Calendar = () => {
  const { loggedUser } = useContext(DevContext);


  return loggedUser.appointments.map((appointment)=>{
    return <Appoinment appointment={appointment} role={loggedUser.role}/>
  })
}
export default Calendar;
