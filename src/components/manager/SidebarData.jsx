import { Icon } from '@mui/material'
import React from 'react'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import EmailIcon from '@mui/icons-material/Email';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import Profile from '@mui/icons-material/AccessibilityNew';
import PendingCustomer from '@mui/icons-material/PendingActions';
import PendingTransaction from '@mui/icons-material/MoreHoriz';
import Card from '@mui/icons-material/CreditScore';
import Update from '@mui/icons-material/Upgrade';
import LoanApplication from '@mui/icons-material/ControlPoint';
import Lock from '@mui/icons-material/LockPerson';


import PersonIcon from '@mui/icons-material/Person';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

import CreditCardIcon from '@mui/icons-material/CreditCard';
import LockIcon from '@mui/icons-material/Lock';






export const SidebarData= [
    {
        title:"Profile",
        icon:<PersonIcon/>,
        link:"/manager/profile"
    },
    {
        title:"Pending Customer",
        icon:<PersonSearchIcon/>,
        link:"/manager/pendingCustomer"
    },
    {
        title:"Pending Transaction",
        icon:<ReceiptLongIcon/>,
        link:"/manager/pendingTransaction"
    },
    {
        title:"Loan Request",
        icon:<CurrencyRupeeIcon/>,
        link:"/manager/loanApplications"
    },
    {
        title:"Credit Card",
        icon:<CreditCardIcon/>,
        link:"/manager/creditCardApplications"
    },
    {
        title:"Locker",
        icon:<LockIcon/>,
        link:"/manager/locker"
    },
    {
        title:"Change Password",
        icon:<Update/>,
        link:"/login/ForgotPassword"
    }
    // {
    //     title:"Bank Report",
    //     icon:<PermMediaIcon/>,
    //     link:"/manager/Report"
    // }
]