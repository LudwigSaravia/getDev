import { useContext, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { DevContext } from "./DevContext";
import { useNavigate } from "react-router-dom";
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
      });
  };

  const inputHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
    <div>
      <p>Select Your Role</p>
      <button
        onClick={() => {
          setRole("student");
        }}
      >
        Non-Developer
      </button>
      <button
        onClick={() => {
          setRole("developer");
        }}
      >
        Developer
      </button>

      {role === "developer" && (
        <div>
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
              placeholder="languages"
              name="languages"
              onChange={inputHandler}
            />
            <button>Complete profile</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Role;
