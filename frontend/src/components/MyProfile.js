import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { DevContext } from "./DevContext";
import AvailabilityManager from "./AvailabilityManager";
import Calendar from "./Calendar";
import UserInformation from "./UserInformation";

const MyProfile = () => {
  const { isAuthenticated } = useAuth0();
  const { loggedUser } = useContext(DevContext);
  console.log("loggedUser", loggedUser);

  return (
    <div>
      {!isAuthenticated && <Navigate to="/" replace={true} />}
      {loggedUser && loggedUser.role == "developer" && <UserInformation/>}
      {loggedUser && <Calendar />}
      {loggedUser && loggedUser.role == "developer" && <AvailabilityManager />}
    </div>
  );
};

export default MyProfile;
