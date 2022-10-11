import { useContext } from "react";
import { DevContext } from "./DevContext";
import Day from "./Day";
import days from "../consts/days";
import styled from "styled-components";

const AvailabilityManager = ({}) => {
  const { loggedUser } = useContext(DevContext);

  return (
    <div>
      <H3>Availability Manager</H3>
      <Wrapper>
        {days.map((day) => {
          return <Day day={day} key={day} />;
        })}
      </Wrapper>
    </div>
  );
};

const H3 = styled.div`
  display: flex;

  justify-content: center;
  align-items: center;
  width: 100%;
  font-family: ARIAL BLACK;
  font-size: 30px;
  font-weight: normal;
  line-height: 60px;
  margin: 10px 0 20px;
  text-transform: uppercase;
  text-shadow: 2px 2px 0 #000;
  /* margin: 10px 0 1px; */
  text-align: center;
  color: #00be67;
  margin-top: 50px;
  margin-bottom: -250px;
`;

const Wrapper = styled.div`
  font-family: ARIAL BLACK;
  font-size: 10px;
  display: flex;
  flex-wrap: wrap;
  /* width: 900px; */
  height: 900px;
  justify-content: center;
  align-items: center;
  width: 100%;
  /* height: 100%; */
  color: #fff;
`;

export default AvailabilityManager;
