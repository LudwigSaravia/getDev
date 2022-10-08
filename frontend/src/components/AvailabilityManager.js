
    import { useContext } from "react";
    import { DevContext } from "./DevContext";
    import Day from "./Day";
    import days from "../consts/days";
    
    const AvailabilityManager = ({}) => {
        const { loggedUser } = useContext(DevContext);
        

        
        return (
            <div> 
            <h3>Manage your availability</h3>
            {days.map((day) => {
                return <Day day={day} key={day}/>
                
            })}
                 </div>
      )
      };
      
      
      export default AvailabilityManager;