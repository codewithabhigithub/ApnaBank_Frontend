import { Icon } from '@mui/material'
import React from 'react'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import EmailIcon from '@mui/icons-material/Email';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';

import HowToRegIcon from '@mui/icons-material/HowToReg';
import Delete from '@mui/icons-material/PersonRemoveSharp';
import Update from '@mui/icons-material/Upgrade';
import All from '@mui/icons-material/PeopleOutline';
// import Profile from '@mui/icons-material/AccessibilityNew';
import PersonIcon from '@mui/icons-material/Person';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import DeleteIcon from '@mui/icons-material/Delete';

export const SidebarData= [
    {
        title:"Profile",
        icon:<PersonIcon/>,
        link:"/admin/profile"
    },
    {
        title:"Create",
        icon:<PersonAddIcon/>,
        link:"/admin/createWorker"
    },
    {
        title:"Update",
        icon:<Update/>,
        link:"/admin/find"
    },
    {
        title:"Delete",
        icon:<DeleteIcon/>,
        link:"/admin/deleteWorker"
    },
    {
        title:"Employees",
        icon:<PeopleAltIcon/>,
        link:"/admin/allWorker"
    },
    {
        title:"Change Password",
        icon:<Update/>,
        link:"/login/ForgotPassword"
    }
]