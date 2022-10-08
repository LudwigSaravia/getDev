import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import days from "../consts/days";
import { DevContext } from "./DevContext";
import hours from "../consts/hours";
import { useAuth0 } from "@auth0/auth0-react";

const DevDetails = () => {
  const [dev, setDev] = useState();
  const devId = useParams().devId;

  const { loggedUser } = useContext(DevContext);
  const { user } = useAuth0();

  if (dev) {
    const availabilityArray = dev.availability;
    console.log("availabilityArray", availabilityArray);
    console.log("days", days);
  }

  const makeAvailable = (email, day, hour) => {
    // "/api/add-availability"

    fetch("/api/add-availability", {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, day, time: hour }),
    });
  };

  const makeAppointment = (email, day, hour) => {
    fetch("/api/add-appointment", {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, day, time: hour }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == 200) {
          window.alert("your session is booked");
        }
      });
  };

  useEffect(() => {
    fetch(`/api/getDev/${devId}`)
      .then((res) => res.json())
      .then((data) => {
        setDev(data.data);
      });
  }, [devId]);

  if (!dev) {
    return <div>Loading ....</div>;
  }

  return (
    <>
      <div>Book a session </div>
      <img src={loggedUser.url ? localStorage.url : dev.url} />
      {days.map((day) => {
        return (
          <>
            <p>{day}</p>
            {hours.map((hour) => {
              const isAvailable = dev.availability[day].includes(hour);
              return isAvailable ? (
                <p>{hour}:00 is unavailable</p>
              ) : (
                <>
                  <p>{hour}:00 is available</p>
                  <button
                    onClick={() => {
                      makeAvailable(dev.email, day, hour); //adds session to dev object in mongo
                      makeAppointment(user.email, day, hour); // adds session to student object in mongo
                    }}
                  >
                    Book
                  </button>
                </>
              );
            })}
          </>
        );
      })}
    </>
  );
};

export default DevDetails;
