import React, { useState, useContext, createContext } from "react";

const defaultValue = {
  user: {
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    userRoleId: -1,
  },
};

const UserContext = createContext(defaultValue);

export default function UserContextProvider({ children }) {
  const [user, setUser] = useState(defaultValue.user);

  const updateUsername = (newUsername) =>
    setUser((prevUser) => {
      return {
        ...prevUser,
        username: newUsername,
      };
    });

  const updatePassword = (newPassword) =>
    setUser((prevUser) => {
      return {
        ...prevUser,
        password: newPassword,
      };
    });

  const updateUserRoleId = (newUserRoleId) =>
    setUser((prevUser) => {
      return {
        ...prevUser,
        userRoleId: newUserRoleId,
      };
    });

  const contextValue = {
    user,
    updatePassword,
    updateUsername,
    updateUserRoleId,
  };

  return (
    <>
      <UserContext.Provider value={contextValue}>
        {children}
      </UserContext.Provider>
    </>
  );
}

export const useUserContext = () => useContext(UserContext);
