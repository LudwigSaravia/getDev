import { DevContext } from "./DevContext";
import { useState, useContext } from "react";

const Hour = ({ hour, day }) => {
  const { loggedUser, updateUser } = useContext(DevContext);

  const availabilityArray = loggedUser.availability[day];

  const [isAvailable, setIsAvailable] = useState(
    availabilityArray.includes(hour)
  );

  const makeAvailable = () => {
    // "/api/add-availability"

    fetch("/api/add-availability", {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: loggedUser.email, day: day, time: hour }),
    })
      .then((res) => res.json())
      .then((data) => {
        updateUser(loggedUser.email);
        setIsAvailable(!isAvailable);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const makeUnavailable = () => {
    // "/api/remove-availability"
    fetch("/api/remove-availability", {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: loggedUser.email, day: day, time: hour }),
    })
      .then((res) => res.json())
      .then((data) => {
        updateUser(loggedUser.email);
        setIsAvailable(!isAvailable);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      {isAvailable ? (
        <>
          {hour}:00 is available{" "}
          <button onClick={makeUnavailable}>Not Available</button>
        </>
      ) : (
        <>
          {hour}:00 is not available{" "}
          <button onClick={makeAvailable}>Available</button>
        </>
      )}
    </div>
  );
};

export default Hour;
