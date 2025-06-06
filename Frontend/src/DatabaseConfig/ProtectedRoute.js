import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';


const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');


  if (!token) {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    return <Navigate to="/" replace />; 
  }

  return children; 
};

export default ProtectedRoute;


