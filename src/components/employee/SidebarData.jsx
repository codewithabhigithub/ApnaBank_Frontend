import { Icon } from '@mui/material'
import React from 'react'
import Profile from '@mui/icons-material/AccessibilityNew';
import OpenAccount from '@mui/icons-material/PersonAddAlt';
import Transaction from '@mui/icons-material/Paid';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import Update from '@mui/icons-material/Upgrade';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import LockPersonIcon from '@mui/icons-material/LockPerson';


import PersonIcon from '@mui/icons-material/Person';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import LockIcon from '@mui/icons-material/Lock';





export const SidebarData= [
    {
        title:"Profile",
        icon:<PersonIcon/>,
        link:"/employee/profile"
    },
    {
        title:"Create Account",
        icon:<AccountBalanceIcon/>,
        link:"/employee/openAccount"
    },
    {
        title:"Transaction",
        icon:<ReceiptLongIcon/>,
        link:"/employee/transaction"
    },
    {
        title:"Loan",
        icon:<CurrencyRupeeIcon/>,
        link:"/employee/loanApplications"
    },
    {
        title:"Credit Card",
        icon:<CreditCardIcon/>,
        link:"/employee/creditCard"
    },
    {
        title:"Locker",
        icon:<LockIcon/>,
        link:"/employee/locker"
    },
    {
        title:"Change Password",
        icon:<Update/>,
        link:"/login/ForgotPassword"
    }
   
]