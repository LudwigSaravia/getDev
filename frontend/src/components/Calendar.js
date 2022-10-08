import { useContext } from "react";
import { DevContext } from "./DevContext";
import Hours from "./Hour";

const Calendar = () => {
  const { loggedUser } = useContext(DevContext);

  // loggedUser.appointments
  // map it and render them
  const getSession = () => {
    return loggedUser.appointments.map((session) => {
      return { days: Object.keys(session), hours: Object.values(session) };
    });
  };

  const getSessionsDev = () => {
    return Object.keys(loggedUser.availability);
  };

  if (loggedUser.role === "developer") {
    return (
      <>
        <img src={loggedUser.url} />
        {getSessionsDev().map((day, index) => {
          return (
            <>
              <p>{day}</p>
              <p>
                {loggedUser.availability[day].map((hour) => (
                  <p>{hour}</p>
                ))}
              </p>
            </>
          );
        })}
      </>
    );
  } else {
    return (
      <div>
        {getSession()[0].days.map((day, index) => {
          return (
            <>
              <p>{day}</p>
              <p>{getSession()[0].hours[index]}</p>
            </>
          );
        })}
      </div>
    );
  }
};

export default Calendar;
