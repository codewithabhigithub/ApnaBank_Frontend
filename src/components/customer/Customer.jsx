import React, { useState } from 'react';
import '../employee/Employee.css'
import { SidebarData } from './SidebarData';
import { Link, Outlet } from 'react-router-dom';

export default function Employee() {
  const [active,setActive]=useState();
  return (
    <>
    <div className='sidebar-admin-container'>
    <div className='sidebar-container'>
      <div className='sidebar-admin'>
        <ul className='sidebarList-admin'>
          {SidebarData.map((val, key) => {
            return (
              <li
                key={key}
                className={`row-admin ${active=== val.link ? "active" : ""}`}
                // onClick={() => {
                //   // window.location.pathname = val.link;
                // }}
              >
                 <Link to={val.link} className='icon-admin' onClick={()=>{setActive(val.link)}} >
                <div className='icon-admin'>{val.icon}</div>
                <div className='title-admin'>{val.title}</div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
    </div>
    <div className="content-container">
        <Outlet />
        </div>
    </>
  );
}

