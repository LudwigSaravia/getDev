import hours from "../consts/hours";
import Hour from "./Hour";
const Day = ({ day }) => {
  return (
    <div>
      <span>{day}</span>
      {hours.map((hour) => {
                return <Hour day={day }hour={hour} key={hour}/>
                
            })}
    </div>
  );
};

export default Day;
