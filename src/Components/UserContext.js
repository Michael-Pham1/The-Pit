import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [activeUser, setActiveUser] = useState(null);

    return (
        <UserContext.Provider value={{ activeUser, setActiveUser }}>
            {children}
        </UserContext.Provider>
    );
};
