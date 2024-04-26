import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();
const ComerciosContext = createContext();

export const useUserContext = () => {
  return useContext(UserContext);
};

export const useComerciosContext = () => {
  return useContext(ComerciosContext);
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [comercios, setComercios] = useState([]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <ComerciosContext.Provider value={{ comercios, setComercios }}>
        {children}
      </ComerciosContext.Provider>
    </UserContext.Provider>
  );
};

export const setUser = () => useContext(UserContext);