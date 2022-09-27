import { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Plane from "./Plane";
import Form from "./Form";

const SeatSelect = ({ selectedFlight }) => {
  const [selectedSeat, setSelectedSeat] = useState("");

  const navigate = useNavigate();
  const handleSubmit = (e, formData) => {
    e.preventDefault();

    fetch("/api/add-reservation", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        flight: selectedFlight,
        seat: selectedSeat,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          localStorage.setItem("reservation", JSON.stringify(data.data));
          navigate("/confirmation");
        }
      });
  };

  return (
    <Wrapper>
      <h2>Select your seat and Provide your information!</h2>
      <>
        <FormWrapper>
          <Plane
            setSelectedSeat={setSelectedSeat}
            selectedFlight={selectedFlight}
          />
          <Form handleSubmit={handleSubmit} selectedSeat={selectedSeat} />
        </FormWrapper>
      </>
    </Wrapper>
  );
};

const FormWrapper = styled.div`
  display: flex;
  margin: 50px 0px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;

export default SeatSelect;
