import React from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from './Components/NavBar';

const Layout = ({ children }) => {
  const location = useLocation();
  const hideNavBarPaths = ["/", "/register", "/reset"];

  return (
    <div>
      {!hideNavBarPaths.includes(location.pathname) && <NavBar />}
      {children}
    </div>
  );
};

export default Layout;
