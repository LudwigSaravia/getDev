import React, { createContext, useState } from "react";

export const DevContext = createContext();

export const DevProvider = ({ children }) => {
  const [devs, setDevs] = useState([]);
  const [newDevAdded, setNewDevAdded] = useState(false);
  return (
    <DevContext.Provider value={{ devs, setDevs, newDevAdded, setNewDevAdded }}>
      {children}
    </DevContext.Provider>
  );
};
