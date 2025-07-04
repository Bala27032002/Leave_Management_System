import React from 'react';
import { Route, Routes } from 'react-router';
import Login from '../Component/Login/Login.jsx';
import Dashboard from '../Pages/Dashboard.jsx';
import EmployeeTable from '../Component/Admin/EmployeeTable.js';
import MyPermission from '../Component/Leave/LeaveApply.jsx';
import ProtectedRoute from '../DatabaseConfig/ProtectedRoute.js';
import HolidayList2025 from '../Component/Leave/HolidayList2025.jsx';

function AllRoutes(){
    const routes=[
        {path :'/dashboard',element : <Dashboard /> },
        {path :'/settings',element : <EmployeeTable /> },
        {path :'/myleave',element : <MyPermission /> },
        {path :'/holiday',element : <HolidayList2025 /> },
    ]
    return( 
        <Routes>
            {routes.map((route)=>(
            <Route key={route.path} 
            path={route.path}
             element={<ProtectedRoute>{route.element}</ProtectedRoute>}/>
        ))}
        <Route path="/" element={<Login />} />
    
        </Routes>
    )
}
export default AllRoutes;