import { useAuth0 } from "@auth0/auth0-react";
import React, { useContext, useState } from "react";
import { DevContext } from "./DevContext";
import TextField from "@mui/material/TextField";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const { loggedUser } = useContext(DevContext);
  const params = useParams();

  const [value, setValue] = useState("");
  const [sessions, setSessions] = useState([]);

  const devId = params.profileId;
  const handleSessionSelect = (e) => {
    if (e.target.checked) {
      setSessions([...sessions, e.target.value]);
    } else {
      const arr = sessions.filter((item) => item !== e.target.value);
      setSessions(arr);
    }
  };

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  const handleReserve = () => {
    if (value && sessions.length) {
      fetch("/api/add-appointment", {
        method: "PATCH",
        body: JSON.stringify({ date: value, times: sessions, devId }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
    }
  };

  const getTimeSlots = (loggedUser) => {
    if (loggedUser) {
      const start = Number(loggedUser.timeSlots.split("-")[0]);
      const end = Number(loggedUser.timeSlots.split("-")[1]);
      const step = Number(loggedUser.length);
      const arrayLength = Math.floor((end - start) / step) + 1;
      const range = [...Array(arrayLength).keys()].map((x) => x * step + start);
      return range;
    }
  };

  return (
    isAuthenticated && (
      <div>
        <div>
          <TextField
            onChange={(e) => {
              setValue(e.target.value);
              console.log(e)
            }}
            id="date"
            type="date"
            inputProps={{ styled: { fontSize: 12 } }}
            InputLabelProps={{ shrink: true }}
          />
          {getTimeSlots(loggedUser).map((time) => {
            return (
              <>
                <label>{time}h</label>
                <input
                  type="checkbox"
                  value={time}
                  onChange={handleSessionSelect}
                />
              </>
            );
          })}

          <button onClick={handleReserve}>Reserve</button>
        </div>

        <img src={loggedUser.picture} alt={loggedUser.name} />
        <h2>{loggedUser.name}</h2>
        <p>{loggedUser.email}</p>
        <p>Known Languages</p>
        <p>{loggedUser.languages}</p>
      </div>
    )
  );
};

export default Profile;
