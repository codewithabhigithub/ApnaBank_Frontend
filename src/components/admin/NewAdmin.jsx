import React from 'react';
import './Admin.css';
import './Sidebar.css';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Route, Routes } from 'react-router-dom';
import EmployeeRegistration from './EmployeeResistration';
function NewAdmin() {
    return (
        <>
        <div className="admin-container">
          <Sidebar />
          <div className="admin-content">
          
             <EmployeeRegistration></EmployeeRegistration>
           
          </div>
        </div>
        <Outlet></Outlet>
        </>
      );
    }

export default NewAdmin;
