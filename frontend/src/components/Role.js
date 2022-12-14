import { useContext, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { DevContext } from "./DevContext";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Role = () => {
  const [role, setRole] = useState("");
  const [form, setForm] = useState({});
  const { newDevAdded, setNewDevAdded } = useContext(DevContext);

  const { user } = useAuth0();

  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();

    fetch("/api/signup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...form, ...user, role }),
    })
      .then((res) => res.json())
      .then((data) => {
        setNewDevAdded(!newDevAdded);
        navigate("/");
      });
  };

  const inputHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const uploadImage = (files) => {
    console.log("files", files[0]);
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "t3w5yvtp");
    fetch("https://api.cloudinary.com/v1_1/dnluaug28/image/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setForm({ ...form, url: data.url });
        console.log("image upload", data); //data.url
      });
  };

  if (role === "student") {
    fetch("/api/signup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...user, role }),
    })
      .then((res) => res.json())
      .then((data) => {
        setNewDevAdded(!newDevAdded);
      });
    navigate("/search");
  }

  return (
    <Body>
      <Wrapper>
        <Para>Select Your Role!</Para>

        <Button
          onClick={() => {
            setRole("student");
          }}
        >
          Non-Developer
        </Button>
        <Button
          onClick={() => {
            setRole("developer");
          }}
        >
          Developer
        </Button>

        {role === "developer" && (
          <Input>
            <form onSubmit={submitHandler}>
              <input
                type="text"
                placeholder="bio"
                name="bio"
                onChange={inputHandler}
              />
              <input
                type="text"
                placeholder="rate"
                name="rate"
                onChange={inputHandler}
              />
              <input
                type="text"
                placeholder="languages (e.g. java, C++)"
                name="languages"
                onChange={inputHandler}
              />

              <input
                type="file"
                name="image"
                required
                onChange={(e) => {
                  uploadImage(e.target.files);
                }}
              />

              <button>Complete profile</button>
            </form>
          </Input>
        )}
      </Wrapper>
    </Body>
  );
};

const Wrapper = styled.div`
  width: 50%;
  font-family: ARIAL BLACK;
  color: #00be67;
  display: flex;
  flex-wrap: wrap;
  padding: 15px 15px 15px 15px;
  justify-content: center;
  align-items: center;
`;

const Para = styled.div`
  font-family: ARIAL BLACK;
  font-size: 35px;
  color: #00be67;
  width: 100%;
  display: flex;
  justify-content: center;
`;
const Button = styled.button`
  font-family: ARIAL BLACK;
  background-color: #001d31;
  font-size: 18px;
  color: #fff;
  height: 10%;
  margin: 15px;
  border: none;
  :hover {
    color: #00be67;
    cursor: pointer;
    border: solid #fff;
  }
`;
const Input = styled.text`
  display: flex;
  align-items: center;
  margin: 10px 10px 10px 50px;
  border-radius: 5px;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  outline: 0;
  font-family: ARIAL BLACK;
`;
const Body = styled.div`
  font-family: ARIAL BLACK;
  color: #00be67;
  display: flex;
  justify-content: center;
  height: 70%;
`;

export default Role;
