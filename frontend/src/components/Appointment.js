import styled from "styled-components";

const Appoinment = ({ appointment, role }) => {
  console.log("new log", appointment);
  return (
    <New>
      <Green>
        <p>{appointment.day}</p>
        <p>{appointment.time}</p>
        <p>{appointment.months}</p>
      </Green>
      <p>
        {role === "student" ? appointment.devEmail : appointment.nonDevEmail}
      </p>
    </New>
  );
};

const Div = styled.div`
  color: white;
`;
export default Appoinment;

const New = styled.div`
  color: white;
  width: 30%;
  margin-top: 5px;
  margin-left: 500px;
  height: fit-content;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  /* align-items: center; */
  line-height: 5px;
  border: solid black;
  border-radius: 10px;
`;
const Green = styled.div`
  color: #00be67;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
