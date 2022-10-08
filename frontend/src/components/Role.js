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
        </div>
      )}
    </div>
  );
};

export default Role;
