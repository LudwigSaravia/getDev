import React, { createContext, useState } from "react";

export const DevContext = createContext();

export const DevProvider = ({ children }) => {
  const [devs, setDevs] = useState([]);
  const [newDevAdded, setNewDevAdded] = useState(false);
  const [loggedUser, setLoggedUser] = useState("");
  console.log(loggedUser);




  const updateUser = (email) => {
    {
      fetch(`/api/getUser/${email}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("data", data);
          if (data.user) {
            setLoggedUser(data.user);
          } else if (data.nonDevUser) {
            console.log(data.nonDevUse);
            setLoggedUser(data.nonDevUser);
          } 
        });
    }

  };
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
