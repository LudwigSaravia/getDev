import React, { createContext, useState } from "react";

export const DevContext = createContext();

export const DevProvider = ({ children }) => {
  const [devs, setDevs] = useState([]);
  const [newDevAdded, setNewDevAdded] = useState(false);
  const [loggedUser, setLoggedUser] = useState("");
  console.log(loggedUser);

  //funtion that accepts email
  // refetches loggeduser info
  // set loggeduser
  const updateUser = (email) => {};
  return (
    <DevContext.Provider
      value={{
        devs,
        setDevs,
        newDevAdded,
        setNewDevAdded,
        loggedUser,
        setLoggedUser,
        updateUser,
      }}
    >
      {children}
    </DevContext.Provider>
  );
};
