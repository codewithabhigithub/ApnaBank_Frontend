import React from 'react'
import Profile from '@mui/icons-material/AccountCircleSharp';
import Create from '@mui/icons-material/PersonAddAltSharp';
import Delete from '@mui/icons-material/PersonRemoveSharp';
import Update from '@mui/icons-material/SyncAltSharp';
import All from '@mui/icons-material/Diversity3Sharp';
import './Admin.css'
import { Outlet } from 'react-router-dom';
function Admin(){
    return(
      <>
      <div class="sidebar">
        <br></br>
        <div className='line'>
        <a href={'/profile'} className='sidebarItems'> <Profile className='icons'/>Profile</a>
        </div>
        <div className='line'>
      <a href={'/admin/createWorker'} className='sidebarItems'><Create className='icons'/>Create</a>
      </div>
      <div className='line'>
      <a href={'updateWorker'} className='sidebarItems'><Update className='icons'/>Update</a>
      </div><div className='line'>
      <a href={'/deleteWorker'} className='sidebarItems'><Delete className='icons'/>Delete</a>
      </div><div className='line'>
      <a href={'/findAllWorker'} className='sidebarItems'><All className='icons'/>All Members</a>
      </div>
      {/* <div className='line'>
      <a href={'/update/password'} className='sidebarItems'><All className='icons'/>Update Password</a>
      </div> */}
    </div>
    <Outlet></Outlet>
    </>
    );
}
export default Admin