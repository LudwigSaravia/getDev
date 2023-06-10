import styled from "styled-components";
import hours from "../consts/hours";
import Hour from "./Hour";

const Day = ({ day }) => {
  return (
    <div>
      <Div>{day}
      {hours.map((hour) => {
        
        return <Hour day={day }hour={hour} key={hour}/>
      })}
      </Div>
    </div>
  );
      
};

const Div = styled.div`
display: flex;
justify-content: space-around;
align-items: center;
margin-left: 40px;
`;

export default Day;
