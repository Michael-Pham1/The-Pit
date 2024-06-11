import React, { createContext, useState } from 'react';

// Create a context
export const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
    const [activeUser, setActiveUser] = useState(null);

    return (
        <UserContext.Provider value={{ activeUser, setActiveUser }}>
            {children}
        </UserContext.Provider>
    );
};
