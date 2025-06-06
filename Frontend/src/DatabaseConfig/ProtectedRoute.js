import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

// Helper function to check token expiry
const isTokenExpired = (token) => {
  if (!token) return true;

  try {
    const payload = JSON.parse(atob(token.split('.')[1])); // Decode token
    const expiry = payload.exp * 1000; // Convert to millisecondsazz
    return Date.now() >= expiry; // Check if the token is expired
  } catch (error) {
    console.error("Token error:", error);
    return true;
  }
};

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  useEffect(() => {
    const interval = setInterval(() => {
      if (token && isTokenExpired(token)) {
        localStorage.removeItem('token'); // Remove expired token
        localStorage.removeItem('name'); // Optionally remove other data
        window.location.href = '/login'; // Redirect to login page
      }
    }, 1000); // Check every second

    return () => clearInterval(interval); // Clear the interval on component unmount
  }, [token]);

  // Check on the initial render if the token is expired
  if (!token || isTokenExpired(token)) {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    return <Navigate to="/login" replace />; // Redirect to login if token expired
  }

  return children; // If the token is valid, return the protected component
};

export default ProtectedRoute;


// import React from 'react';
// import { Navigate } from 'react-router-dom';

// const isTokenExpired = (token) => {
//   if (!token) return true;

//   try {
//     const payload = JSON.parse(atob(token.split('.')[1]));
//     const expiry = payload.exp * 1000; 
//     return Date.now() >= expiry;
//   } catch (error) {
//     console.error('Token parsing error:', error);
//     return true;
//   }
// };

// const ProtectedRoute = ({ children }) => {
//   const token = localStorage.getItem('token'); // 🔥 use 'token' small

//   if (!token || isTokenExpired(token)) { // 🔥 also expire check optional
//     localStorage.removeItem('token');
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// };

// export default ProtectedRoute;


