// import { Icon } from '@mui/material'
import React from 'react'
// import Profile from '@mui/icons-material/AccessibilityNew';
// import Transaction from '@mui/icons-material/Paid';
// import CreditScoreIcon from '@mui/icons-material/CreditScore';
import RedeemIcon from '@mui/icons-material/Redeem';
// import ControlPointIcon from '@mui/icons-material/ControlPoint';
// import LockPersonIcon from '@mui/icons-material/LockPerson';
import Update from '@mui/icons-material/Upgrade';
import PersonIcon from '@mui/icons-material/Person';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import LockIcon from '@mui/icons-material/Lock';
import CreditCardIcon from '@mui/icons-material/CreditCard';



export const SidebarData= [
    {
        title:"Profile",
        icon:<PersonIcon/>,
        link:"/customer/profile"
    },
    {
        title:"Transaction",
        icon:<ReceiptLongIcon/>,
        link:"/customer/transaction"
    },
    {
        title:"Loan",
        icon:<CurrencyRupeeIcon/>,
        link:"/customer/loan"
    },
    {
        title:"Credit Card",
        icon:<CreditCardIcon/>,
        link:"/customer/creditCard"
    },
    {
        title:"Locker",
        icon:<LockIcon/>,
        link:"/customer/locker"
    },
    {
        title:"Change Password",
        icon:<Update/>,
        link:"/login/ForgotPassword"
    },
    {
        title:"Gift Card",
        icon:<RedeemIcon/>,
        link:"/customer/giftcard"
    }
   
]